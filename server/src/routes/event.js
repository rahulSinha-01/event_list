import express, { Router } from "express";
import RequireAuth from "../middleware/requireAuth";
import Event from "../models/event";
import User from "../models/user";
const router = express.Router();

router.get("/event", (req, res) => {
  Event.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.get("/event/:userId", (req, res) => {
  User.findById(req.params.userId).then((user) => {
    let _events = [];
    user.events.forEach((val) => {
      Event.findById(val)
        .then((event) => _events.push(event))
        .catch((err) => {});
    });
    res.status(200).json({ events: _events });
  });
});
router.post("/event/:userId", RequireAuth, (req, res) => {
  let { eventName, eventDate, address, phoneNo, about } = req.body;
  User.findById(req.params.userId)
    .then((user) => {
      Event.create({
        eventName,
        eventDate,
        address,
        phoneNo,
        about,
        email: user.email,
        author: user._id,
      })
        .then((event) => {
          console.log(user);
          user.events.push(event);
          user.save();
          res.status(200).send({ event });
        })
        .catch((err) => res.status(400).json({ err: err.message }));
    })
    .catch((err) => res.status(404).json({ err: err.message }));
});

export default router;
