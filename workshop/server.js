const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");

const data = require("../data.json");
const loginData = require("../loginData.json");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const server = express();

server.use(express.static("workshop/public"));

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.use(express.urlencoded());
server.use(cookieParser());

console.log(data);

server.get("/", (req, res) => {
  const html = templates.logIn();
  res.send(html);
});

server.post("/log-in", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  fs.writeFileSync("loginData.json", JSON.stringify(data.concat(req.body)));
  console.log(2, "email");
  console.log(2, "password");
  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
});

server.post("/sign-up", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(2, "email");
  console.log(2, "password");
  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
});

server.get("/details", (req, res) => {
  const html = templates.details();
  res.send(html);
});

server.post("/details", (req, res) => {
  console.log(1, req.body);
  fs.writeFileSync("data.json", JSON.stringify(data.concat(req.body)));
  const html = templates.results();
  res.send(html);
});

/////////////////////////////////////////////////////

server.get("/", (req, res) => {
  const email = req.cookies.email;
  const html = templates.home(email);
  res.send(html);
});

server.get("/log-out", (req, res) => {
  res.clearCookie("email");
  res.redirect("/");
});
