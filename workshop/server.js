const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");
const cookieParser = require("cookie-parser");
const db = require("./database/connection");
const checkEmail = require("./checkEmail");

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

server.get("/log-in", (req, res) => {
  const email = req.cookies.email;
  if (email) {
    res.redirect("/history");
    return;
  }
  const html = templates.logIn();
  res.send(html);
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
  const result = await db.query(
    "Select email From users u Where u.email = $1",
    [email]
  );
  if (result.rows.length == 0) {
    // if no INSERT INTO users in the database and then go to details
    db.query("INSERT INTO users (email , password) VALUES ($1, $2)", [
      email,
      password,
    ]);
    res.cookie("email", email, { maxAge: 600000 });
    res.redirect("/details");
    return;
  }

  if (email === result.rows[0].email) {
    // if yes then go to templates.someThingWrong();
    const html = templates.someThingWrong("email is found");
    res.send(html);
    return;
  }
});

//////////////////////////////////////

server.post("/log-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // checking if the email and the password is in the database
  const result = await db.query(
    "Select email,password From users u Where u.email = $1",
    [email]
  );
  if (result.rows.length == 0) {
    // if no then go to templates.someThingWrong();
    const html = templates.someThingWrong("email not found");
    res.send(html);
    return;
  }
  if (email === result.rows[0].email) {
    if (password != result.rows[0].password) {
      // if yes but the password is wrong
      const html = templates.someThingWrong("password is wrong");
      res.send(html);
    } else {
      // if yes then go to the details
      res.cookie("email", email, { maxAge: 600000 });
      res.cookie("password", password, { maxAge: 600000 });
      res.redirect("/history");
    }
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

server.get("/results", checkEmail, async (req, res) => {
  const email = req.cookies.email;
  let x = "";
  console.log(email);

  const result = await db.query(
    "Select name,age,length,weight From users u, details d Where u.email=d.email AND d.email= $1",
    [email]
  );
  console.log(1, result.rows);
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
  if (age >= 18) {
    if (bmi < 16) x = "Severe Thinness";
    else if (bmi >= 16 && bmi < 17) x = "Moderate Thinness";
    else if (bmi >= 17 && bmi < 18.5) x = "Mild Thinness";
    else if (bmi >= 18.5 && bmi < 25) x = "Normal";
    else if (bmi >= 25 && bmi < 30) x = "Overweight";
    else if (bmi >= 30 && bmi < 35) x = "Obese Class I";
    else if (bmi >= 35 && bmi < 40) x = "Obese Class II";
    else if (bmi >= 40) x = "Obese Class III";
  } else if (age >= 2 && age < 18) {
    if ((bmi / 100) * bmi < 5) x = "Underweight";
    else if ((bmi / 100) * bmi >= 5 && (bmi / 100) * bmi < 85)
      x = "Healthy weight";
    else if ((bmi / 100) * bmi >= 85 && (bmi / 100) * bmi < 95)
      x = "At risk of overweight";
    else if ((bmi / 100) * bmi >= 95) x = "Overweight";
  } else {
    x = "cannot calculate for babies :))))))";
  }

  const html = templates.results(name, x);
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
    const html = templates.someThingWrong("There is no details yet!");
    res.send(html);
  } else {
    const name = result.rows[0].name;
    const age = result.rows[0].age;
    const length = result.rows[0].length;
    const weight = result.rows[0].weight;
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
