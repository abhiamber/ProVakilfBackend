const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleWare/auth");

const User = require("../models/user.moldel");
const Schedule = require("../models/scehudle.model");

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const { day, dayStart, dayEnd, eventDuration } = req.body;
    const user_id = req.user.id;
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ err: "User not found" });
    }

    const presentSchedule = await Schedule.findOne({ user_id, day });

    if (presentSchedule) {
      return res.status(403).json({ err: "Schedule already exist" });
    }
    const newSchedule = new Schedule({
      user_id,
      day,
      dayStart,
      dayEnd,
      eventDuration,
    });
    await newSchedule.save();
    foundUser.schedules.push(newSchedule);
    await foundUser.save();

    return res.status(200).json(newSchedule);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.get("/get/:scheduleId", isAuthenticated, async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) {
      return res.status(404).json({ err: "User not found" });
    }

    const schedules = await Schedule.find({ user_id: req.params.userId });
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});
module.exports = router;
