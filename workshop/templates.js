function layout(content) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>health app</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <a href="/log-in">Log in</a>
            <a href="/history">history</a>
            <a href="/details">Write your details</a>
            <a href="/results">Results</a>
            <a href="/log-out">Log out</a>
          </nav>
        </header>
        ${content}
      </body>
    </html>
  `;
}

function logOut(email) {
  return layout(/*html */ `
    <h1>Good Bye ${email}</h1> 
    <p>You will be redirected in 3 seconds</p>
    <script>
        var timer = setTimeout(function() {
            window.location='http://localhost:3000/'
        }, 3000);
    </script>`);
}
function home() {
  return layout(/*html */ `
    <h1>hello</h1> `);
}
function logIn() {
  return layout(/*html */ `
    <h1>Hello<h1>
    <h2>Please Log in to your account first</h2>
    <form action="/log-in" method="POST">
    <label for="email">
    Your email<span aria-hidden="true">*</span>
    </label>
    <input id="email" type="email" name="email" required>
    <label for="password">
    Your password<span aria-hidden="true">*</span>
    </label>
    <input id="password" type="password" name="password" minlength="8" required>
    <button type="submit">Log in</button>
    </form>
    <h6><a href="http://localhost:3000/sign-up"> If you don't have an account yet</a></h6>
  `);
}
function signUp() {
  return layout(/*html */ `
  <h2>Please Sign Up here</h2>
  <form action="/sign-up" method="POST">
  <label for="email">
  Your email<span aria-hidden="true">*</span>
  </label>
  <input id="email" type="email" name="email" required>
  <label for="password">
  Your password<span aria-hidden="true">*</span>
  </label>
  <input id="password" type="password" name="password" minlength="8" required>
  <button type="submit">Sign Up</button>
  </form>
  `);
}
function details() {
  return layout(/*html */ `
    <h1>Add your details</h1>
    <form action="/details" method="POST">
      <label for="name">
        Your name<span aria-hidden="true">*</span>
      </label>
      <input id="name" type="text" name="name" required>

      <label for="age">
        your age<span aria-hidden="true">*</span>
      </label>
      <input id="age" type="number" name="age" required>

      <label for="length">
        length<span aria-hidden="true">*</span>
      </label>
      <input id="length" type="text" name="length" required>

      <label for="weight">
        weight<span aria-hidden="true">*</span>
      </label>
      <input id="weight" type="text" name="weight" required>

      <button type="submit">Submit</button>
    </form>
  `);
}

function results(name, x) {
  return layout(/*html */ `
  <h1>Here is the results</h1>
  <h2>Depending on your (${name}) details you are going to live to the age of: ${x}</h2>
  `);
}

function history(name, age, length, weight) {
  return layout(/*html */ `
  <h1>Here is your history</h1>
  <h2>name: ${name}</br>age: ${age}</br>length: ${length}</br>weight:${weight}</br></h2>
  `);
}

function someThingWrong(content) {
  return layout(/*html */ `
  <h1>${content}</h1>
  <h2>Try To Find Out The Reason :(</h2>
  `);
}

module.exports = {
  logOut,
  logIn,
  details,
  results,
  someThingWrong,
  signUp,
  history,
  home,
};
