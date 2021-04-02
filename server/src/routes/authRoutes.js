import express, { response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", (req, res) => {
  let { email, password, name } = req.body;

  User.create({ email, password, name })
    .then((user) => {
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
      res.status(200).json({ token, user });
    })
    .catch((err) => res.status(404).json({ err: err.message }));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ err: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ err: "Email not found!" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.status(200).json({ token, user });
  } catch (err) {
    return res.status(422).json({ err: "Invalid email or password" });
  }
});

export default router;
