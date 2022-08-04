const express = require("express");
const PORT = process.env.PORT || 3000;
const templates = require("./templates");
const fs = require("fs");
const cookieParser = require("cookie-parser");

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
  const email = req.body.email;
  const password = req.body.password;

  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
});

server.post("/sign-up", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.cookie("email", email, { maxAge: 600000 });
  res.cookie("password", password, { maxAge: 600000 });
  res.redirect("/details");
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
