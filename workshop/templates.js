function layout(content) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Learn Express</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Log in</a>
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

function home(email) {
  if (email) {
    return layout(/*html */ `
      <h1>Welcome back ${email}</h1>
      <a href="/log-out">Log out</a>
    `);
  } else {
    return layout(/*html */ `
      <h1>Learn Express</h1>
      <a href="/log-in">Log in</a>
    `);
  }
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
    
    <h1>Or<h1>
    <h2>If you don't have an account yet</h2>
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
      <label for="author">
        Your name<span aria-hidden="true">*</span>
      </label>
      <input id="author" type="text" name="author" required>

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

      <label for="sport">
      sport<span aria-hidden="true">*</span>
      </label>
      <input id="sport" type="radio" name="sport">Yes</input>
      <input id="sport" type="radio" name="sport">No</input>
      <label for="sprot">if you've answered yes, what kind of spots to exercise</label>
      <textarea id="sport" name="sport"></textarea>

      <label for="diseases">
      diseases<span aria-hidden="true">*</span>
      </label>
      <input id="diseases" type="radio" name="diseases">Yes</input>
      <input id="diseases" type="radio" name="diseases">No</input>
      <label for="diseases">if you've answered yes, what kind of diseases you have</label>
      <textarea id="diseases" name="diseases"></textarea>

      <label for="allergy">
      allergy<span aria-hidden="true">*</span>
      </label>
      <input id="allergy" type="radio" name="allergy">Yes</input>
      <input id="allergy" type="radio" name="allergy">No</input>
      <label for="allergy">if you've answered yes, what kind of allergy you have</label>
      <textarea id="allergy" name="allergy"></textarea>

      <button type="submit">Submit</button>
    </form>
  `);
}

function results() {
  return layout(/*html */ `
  <h1>Here is the results</h1>
  <h2>Depending on your details you are going to live to the age of: 45-50</h2>
  `);
}

module.exports = { home, logIn, details, results };
