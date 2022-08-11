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
  const result = await db.query(
    "Select email,password From users u Where u.email = $1",
    [email]
  );

  const result2 = await db.query(
    "Select email From details d Where d.email = $1",
    [email]
  );

  if (result.rows.length == 0) {
    // if no then go to templates.someThingWrong();
    const html = templates.someThingWrong("Email not found");
    res.send(html);
    return;
  }
  if (email === result.rows[0].email) {
    // if yes, check the password
    if (password != result.rows[0].password) {
      // if the password is wrong
      const html = templates.someThingWrong("Wrong password - try again");
      res.send(html);
    } else {
      // if the password is correct then go to the details or to the history
      res.cookie("email", email, { maxAge: 600000 });
      res.cookie("password", password, { maxAge: 600000 });

      if (result2.rows.length == 0) {
        // if there are no histories
        res.redirect("/details");
      } else {
        // if there are histories
        res.redirect("/history");
      }
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

server.get("/results", checkEmail, async (req, res) => {
  const email = req.cookies.email;
  let x = "";

  const result = await db.query(
    "Select name,age,length,weight From users u, details d Where u.email=d.email AND d.email= $1",
    [email]
  );

  console.log(1, result.rows);
  if (result.rows.length == 0) {
    res.redirect("./details");
    return;
  }
  const name = result.rows[result.rows.length - 1].name;
  // depending on the database data we should send the result here to the result method
  const age = result.rows[result.rows.length - 1].age;
  const length = result.rows[result.rows.length - 1].length / 100;
  const weight = result.rows[result.rows.length - 1].weight;
  const bmi = weight / Math.pow(length, 2);

  if (age >= 18) {
    if (bmi < 16.0) x = "Severe Thinness";
    else if (bmi >= 16.0 && bmi < 17.0)
      x =
        "Moderate Thinness: Being underweight has its own associated risks. In some cases, being underweight can be a sign of some underlying condition or disease such as anorexia nervosa, which has its own risks. Consult your doctor if you think you or someone you know is underweight, particularly if the reason for being underweight does not seem obvious.";
    else if (bmi >= 17.0 && bmi < 18.5)
      x =
        "Mild Thinness: Being underweight has its own associated risks. In some cases, being underweight can be a sign of some underlying condition or disease such as anorexia nervosa, which has its own risks. Consult your doctor if you think you or someone you know is underweight, particularly if the reason for being underweight does not seem obvious.";
    else if (bmi >= 18.5 && bmi < 25.0) x = "Normal: keep up the good work!";
    else if (bmi >= 25.0 && bmi < 30.0)
      x =
        "Overweight: Being overweight increases the risk of a number of serious diseases and health conditions.Generally, a person should try to maintain a BMI below 25 kg/m2, but ideally should consult their doctor to determine whether or not they need to make any changes to their lifestyle in order to be healthier.";
    else if (bmi >= 30.0 && bmi < 35.0)
      x =
        "Obese Class I: Being overweight increases the risk of a number of serious diseases and health conditions.Generally, a person should try to maintain a BMI below 25 kg/m2, but ideally should consult their doctor to determine whether or not they need to make any changes to their lifestyle in order to be healthier.";
    else if (bmi >= 35.0 && bmi < 40.0)
      x =
        "Obese Class II: Being overweight increases the risk of a number of serious diseases and health conditions.Generally, a person should try to maintain a BMI below 25 kg/m2, but ideally should consult their doctor to determine whether or not they need to make any changes to their lifestyle in order to be healthier.";
    else if (bmi >= 40.0)
      x =
        "Obese Class III: Obese Class II: Being overweight increases the risk of a number of serious diseases and health conditions.Generally, a person should try to maintain a BMI below 25 kg/m2, but ideally should consult their doctor to determine whether or not they need to make any changes to their lifestyle in order to be healthier.";
  } else {
    x = "We cannot calculate for babies :(";
  }

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
