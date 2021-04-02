import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import AuthRoutes from "./routes/authRoutes";
import EventRoutes from "./routes/event";
import requireAuth from "./middleware/requireAuth";
const port = 9000;
const app = express();

mongoose
  .connect("mongodb://localhost/_intern_", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db is connected!"));
app.use(cors());
app.use(express.json());
app.use("/", AuthRoutes);
app.use("/", EventRoutes);

app.get("/", requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
