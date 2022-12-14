const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");
const cookieParser = require("cookie-parser");
const db = require("./database/connection");
const checkEmail = require("./middleware/checkEmail");
const bmiFunc = require("./functions/bmiFunc");

const server = express();
server.use(express.static("workshop/public"));
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

//////////////////////////////////////

server.get("/", (req, res) => {
  const html = templates.home();
  res.send(html);
});

//////////////////////////////////////

server.get("/log-in", (req, res) => {
  const email = req.cookies.email;
  // if already logged in - redirect to the history page
  if (email) {
    res.redirect("/history");
    return;
  }
  const html = templates.logIn();
  res.send(html);
});

server.post("/log-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // checking if the email and the password are in the database
  const loginCheck = await db.query(
    "Select email,password From users u Where u.email = $1",
    [email]
  );

  // checking if there is previous history
  const historyCheck = await db.query(
    "Select email From details d Where d.email = $1",
    [email]
  );

  if (loginCheck.rows.length == 0) {
    // if no then go to templates.someThingWrong();
    const html = templates.someThingWrong("Email not found");
    res.send(html);
    return;
  }
  if (password != loginCheck.rows[0].password) {
    // if the password is wrong
    const html = templates.someThingWrong("Wrong password - try again");
    res.send(html);
  } else {
    // if the password is correct then go to the details or to the history
    res.cookie("email", email, { maxAge: 600000 });
    res.cookie("password", password, { maxAge: 600000 });

    if (historyCheck.rows.length == 0) {
      // if there are no histories
      res.redirect("/details");
    } else {
      // if there are histories
      res.redirect("/history");
    }
  }
});

//////////////////////////////////////

server.get("/sign-up", (req, res) => {
  const html = templates.signUp();
  res.send(html);
});

server.post("/sign-up", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // checking if the email is in the database
  const signUpCheck = await db.query(
    "Select email From users u Where u.email = $1",
    [email]
  );
  if (signUpCheck.rows.length == 0) {
    // if no INSERT INTO users in the database and then go to details
    db.query("INSERT INTO users (email , password) VALUES ($1, $2)", [
      email,
      password,
    ]);
    res.cookie("email", email, { maxAge: 600000 });
    res.redirect("/details");
    return;
  }
  if (email === signUpCheck.rows[0].email) {
    // if yes then go to templates.someThingWrong();
    const html = templates.someThingWrong(
      "Email already exists, try logging in"
    );
    res.send(html);
    return;
  }
});

//////////////////////////////////////

server.get("/details", checkEmail, (req, res) => {
  const html = templates.details();
  res.send(html);
});

server.post("/details", checkEmail, (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const length = req.body.length;
  const weight = req.body.weight;
  const email = req.cookies.email;

  // sending the data from the req to the database
  db.query(
    "INSERT INTO details (email ,name, age, length, weight) VALUES ($1, $2, $3, $4, $5)",
    [email, name, age, length, weight]
  );

  res.redirect("/results");
});

//////////////////////////////////////

server.get("/results", checkEmail, bmiFunc, async (req, res) => {
  const email = req.cookies.email;

  const result = await db.query(
    "Select name,age,length,weight From users u, details d Where u.email=d.email AND d.email= $1",
    [email]
  );

  if (result.rows.length == 0) {
    res.redirect("./details");
    return;
  }
  const name = result.rows[0].name;
  // depending on the database data we should send the result here to the result method
  const age = result.rows[0].age;
  const length = result.rows[0].length / 100;
  const weight = result.rows[0].weight;
  const bmi = weight / Math.pow(length, 2);

  let x = bmiFunc(name, age, length, weight, bmi);

  const html = templates.results(name, bmi.toFixed(2), x);
  res.send(html);
});

//////////////////////////////////////

server.get("/history", checkEmail, async (req, res) => {
  const email = req.cookies.email;

  const result = await db.query(
    "Select name,age,length,weight From users u, details d Where u.email=d.email AND d.email= $1",
    [email]
  );

  if (result.rows.length == 0) {
    // if there are no details yet
    const html = templates.someThingWrong("There are no details yet!");
    res.send(html);
  } else {
    // to show up the last details , with the last result
    const name = result.rows[result.rows.length - 1].name;
    const age = result.rows[result.rows.length - 1].age;
    const length = result.rows[result.rows.length - 1].length;
    const weight = result.rows[result.rows.length - 1].weight;
    const html = templates.history(name, age, length, weight);
    res.send(html);
  }
});

//////////////////////////////////////

server.get("/log-out", checkEmail, (req, res, next) => {
  const email = req.cookies.email;
  res.clearCookie("email");
  const html = templates.logOut(email);
  res.send(html);
  next();
});

/////////////////////////////////////
