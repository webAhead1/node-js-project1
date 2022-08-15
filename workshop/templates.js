function layout(content) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health app</title>
        <link rel="stylesheet" href="/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,400;1,300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </head>
      <body>
      <div class="hero">
      <nav>
          <h2 class="logo">Asma's<span> HealthWeb</span></h2>
          <ul>
              <a href="/"class="btn">Home</a>
              <a href="/log-in"class="btn">Log in</a>
              <a href="/history"class="btn">History</a>
              <a href="/details"class="btn">Write Details</a>
              <a href="/results"class="btn">Results</a>
              <a href="/log-out"class="btn">Log Out</a>
          </ul>
      </nav>
        ${content}
      </body>
    </html>
  `;
}

function logOut(email) {
  return layout(/*html */ `
  <div class="logOut">
    <h1 class="bye">GoodBye ${email}</h1> 
    <p>You will be redirected to the homepage in 5 seconds</p>
    <script>
        var timer = setTimeout(function() {
            window.location='http://localhost:3000/'
        }, 5000);
    </script>
    </div>
    `);
}
function home() {
  return layout(/*html */ `
    <div class="homepage">
    <h1>Welcome to our <span>HealthWeb</span></h1>
    <h2>Our web will calculate Your body mass index<span> (BMI)</span></h2>
    <h2>We provide information and some tips depending on the results</h2> `);
}
function logIn() {
  return layout(/*html */ `
  <div class="signin">
    <h2>Login</h2>
    <form action="/log-in" method="POST">
    <form id="emailin">
    <p>  
    <input id="email" type="email" name="email" placeholder="Example@whatever.com" required><i class="validation"></i>
    </p>
    <p>
    <input id="password" type="password" name="password" placeholder="Enter Your Password" minlength="8" required><i class="validation"></i>
    </p>
    <p>
    <input type="submit" id="login" value="Login">
    </p>
    </form>
    </form>
    <div id="create-account-wrap">
    <p><a href="http://localhost:3000/sign-up"> If you don't have an account yet, click here to register</a></p>
    </div><!--create-account-wrap-->
    </div><!--login-form-wrap-->
  `);
}
function signUp() {
  return layout(/*html */ `
  <div class="signuptitle">
  <h2>Registration</h2>
  <form action="/sign-up" method="POST">
  <form id="whatever">
  <p>
  <input id="email" type="email" name="email" placeholder ="Enter Your Email" required><i class="crying"></i>
  </p>
  <p>
  <input id="password" type="password" name="password" placeholder="Create Your Password" minlength="8" required><i class="crying"></i>
  </p>
  <p>
  <input type="submit" id="signup" value"Signup">
  </p>
  </form>
  </form>
  </div>
  `);
}
function details() {
  return layout(/*html */ `
  <div class="writeDetails">
    <h1>Add your details</h1>
    <form action="/details" method="POST">
      <label for="name">
        Name<span aria-hidden="true">*</span>
      </label>
      <input id="name" type="text" name="name" required>

      <label for="age">
        Age<span aria-hidden="true">*</span>
      </label>
      <input id="age" type="number" min="18" name="age" required>

      <label for="length">
        Height (m)<span aria-hidden="true">*</span>
      </label>
      <input id="length" type="text" name="length" required>

      <label for="weight">
        Weight (kg)<span aria-hidden="true">*</span>
      </label>
      <input id="weight" type="text" name="weight" required>

      <input type="submit" id="submit" value"Submit">
    </form>
    </div>
  `);
}

function results(name, bmi, x) {
  return layout(/*html */ `
  <div class="results">
  <h1>Hey ${name}</h1>
  <h2>Your Body Mass Index is <span>${bmi}</span> This is considered as ${x}</h2>
  </div>
  `);
}

function history(name, age, height, weight) {
  return layout(/*html */ `
  <div class="history">
  <h1>Current Details</h1>
  <h2>Name : ${name}</br>Age : ${age}</br>Height (m) : ${height}</br>Weight (kg) : ${weight}</br></h2>
  </div>
  `);
}

function someThingWrong(content) {
  return layout(/*html */ `
  <div class="someThingwrong">
  <h1>${content}</h1>
  </div>
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
