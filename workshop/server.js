const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");

const data = require("../data.json");
const loginData = require("../loginData.json");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { Agent } = require("http");

const server = express();
server.use(express.static("workshop/public"));
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.use(express.urlencoded());
server.use(cookieParser());

server.get("/", (req, res) => {
  const html = templates.logIn();
  res.send(html);
});

server.post("/log-in", (req, res) => {
  let flag = 0;
  const email = req.body.email;
  const password = req.body.password;

  const jsonString = fs.readFileSync("loginData.json");
  const someData = JSON.parse(jsonString);
  /*for (let key in someData[0]) {
    if (
      email === someData[0].hasOwnProperty(key) &&
      password === someData[0].hasOwnProperty(key)
    ) {
      flag = 1;
    }
  }

  if (flag === 1) {*/
  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
  /*} else {
    const html = templates.someThingWrong("email and password not found");
    res.send(html);
  }*/
});

server.post("/sign-up", (req, res) => {
  const flag = 1;
  const email = req.body.email;
  const password = req.body.password;

  const jsonString = fs.readFileSync("loginData.json");
  const someData = JSON.parse(jsonString);
  /*for (let key in someData[0]) {
    if (
      email === someData[0].hasOwnProperty(key) &&
      password === someData[0].hasOwnProperty(key)
    ) {
      flag = 0;
    }
  }
  if (flag === 1) {*/
  fs.writeFileSync(
    "loginData.json",
    JSON.stringify(loginData.concat(req.body))
  );
  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
  /*} else {
    const html = templates.someThingWrong("email and password are found");
    res.send(html);
  }*/
});

server.get("/details", (req, res) => {
  const html = templates.details();
  res.send(html);
});

server.post("/details", (req, res) => {
  fs.writeFileSync("data.json", JSON.stringify(data.concat(req.body)));
  const html = templates.results();
  res.send(html);
});

server.get("/results", (req, res) => {
  const jsonString = fs.readFileSync("data.json");
  const p = JSON.parse(jsonString);
  console.log(1, JSON.parse(jsonString)[0]);
  const x = 0;
  /*for (var key in p) {
    if (p.hasOwnProperty(key)) {
      console.log(key + " -> " + p[key]);
    }
  }*/
  // here i should filter this data
  const html = templates.results(x);
  res.send(html);
});

server.get("/log-out", (req, res) => {
  const email = req.cookies.email;
  const html = templates.logOut(email);
  res.send(html);
});

server.get("/log-out", (req, res) => {
  res.clearCookie("email");
  res.redirect("/");
});
