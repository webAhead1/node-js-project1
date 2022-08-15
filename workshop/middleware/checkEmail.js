function checkEmail(req, res, next) {
  const email = req.cookies.email;

  if (!email) {
    res.redirect("/log-in");
    return;
  }
  next();
}

module.exports = checkEmail;
