const validateName = (name) => {
  const nameReg = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/);
  return nameReg.test();
};

const validateEmail = (email) => {
  const emailRegex = new RegExp();
  return emailRegex.test();
};

const validatePassword = () => {
  const passwordRegex = new RegExp(/Aa-Zz0-9/);
  return passwordRegex.test();
};

module.exports = { validateEmail, validateName, validatePassword };
