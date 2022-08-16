// not a middleware function
function bmiFunc(name, age, length, weight, bmi) {
  let x = "";
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
  return x;
}

module.exports = bmiFunc;
