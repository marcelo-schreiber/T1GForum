const validEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validInfo = (req, res, next) => {
  const { email, name, password } = req.body;

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    }
    if (!validEmail(email)) {
      return res.status(400).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json("Missing Credentials");
    }
    if (!validEmail(email)) {
      return res.status(400).json("Invalid Email");
    }
  }

  next();
};
