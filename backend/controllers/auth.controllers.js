import { User } from "../db/index.js";

export const signInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "Password not matched!",
      });

    const token = user.generateToken();

    res.cookie("token", token);
    return res.status(200).json({
      message: "Logged In!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error: error,
    });
  }
};

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = user.generateToken();
    res.cookie("token", token);
    return res.status(201).json({
      message: "User has been created!",
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({
        message: "Email already used!",
        error: error,
      });

    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error: error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error: error,
    });
  }
};
