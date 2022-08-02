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
  /* for (let key in someData[0]) {
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
  console.log(p[0].length);
  let x = "0";
  console.log(p[0].author);
  console.log(req.body);
  for (let idx in p) {
    if (p[idx].author === req.body.author) {
      if (parseInt(p[idx].length) < 150 && parseInt(p[idx].weight) > 70) {
        console.log(p[idx]);
        x = "50 - 60";
      }
    }
  }
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
