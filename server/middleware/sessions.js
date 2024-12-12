const sessionExpiryChecker = (req, res, next) => {
  if (
    req.session &&
    req.session.cookie &&
    req.session.cookie.expires < Date.now()
  ) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.redirect("/login");
    });
  } else {
    next();
  }
};

export default sessionExpiryChecker;
