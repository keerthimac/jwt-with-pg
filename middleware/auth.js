const auth = async (req, res, next) => {
  try {
    //01 save the token from the request header
    const token = req.header("x-auth-token");
    const user = req.user;
    console.log(user);

    //02 check if the token is valid
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: "No token provided",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //03 set user to the verified user
    req.user = verified;
    console.log(verified);

    //04 call next()
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = auth;
