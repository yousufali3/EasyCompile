import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const setCookie = (res, token) => {
  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!usernameRegex.test(username)) {
    return res
      .status(400)
      .send({ message: "Username contains invalid characters!" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user);
    setCookie(res, token);

    return res.status(201).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
      savedCodes: user.savedCodes,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).send({ message: "Error signing up!", error });
  }
};

export const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const userQuery = userId.includes("@")
      ? { email: userId }
      : { username: userId };
    const existingUser = await User.findOne(userQuery);

    if (!existingUser) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = generateToken(existingUser);
    setCookie(res, token);

    return res.status(200).send({
      username: existingUser.username,
      picture: existingUser.picture,
      email: existingUser.email,
      savedCodes: existingUser.savedCodes,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ message: "Error logging in!", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).send({ message: "Logged out successfully!" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).send({ message: "Error logging out!", error });
  }
};

export const userDetails = async (req, res) => {
  const userId = req._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
      savedCodes: user.savedCodes,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res
      .status(500)
      .send({ message: "Error fetching user details", error });
  }
};
