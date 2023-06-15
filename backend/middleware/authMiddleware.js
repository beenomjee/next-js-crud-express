import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(400).json({
        message: "Token not found!",
      });

    const signature = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = signature;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      res.clearCookie("token");
      return res.status(400).json({
        message: "Invalid token!",
      });
    }

    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error,
    });
  }
};
export default authMiddleware;
