const validation = (req, res, next) => {
  //01. destructure the req.body (name, email, password)
  const { email, firstName, lastName, password } = req.body;

  //02.define function to validate the email
  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  //03.Validate the information form req.body
  if (req.path === "/register") {
    if (![email, firstName, lastName, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  //04 call next()
  next();
};

module.exports = validation;
