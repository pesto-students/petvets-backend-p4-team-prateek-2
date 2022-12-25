const express = require("express");
const router = express.Router();

const Appointment = require("../../models/appointments.model");

router.get("/", (req, res) => {
    const vetId = req.query.vetId;
    const date = new Date(req.query.date);
    const tomorrow = date.setDate(date.getDate() + 2);

    if (!vetId) {
      res.status(400).json("require vetId");
      return;
    }
    Appointment.find({ vetId: vetId, bookingDate: {$gte: date} })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).json("Error: " + err));
  });

  router.post("/", (req, res) => {
    const appointment = new Appointment(req.body);
    appointment
      .save()
      .then(() =>
        res.json(
          `Appointment is booked for ${appointment.bookingDate} at ${appointment.bookedSlot}`
        )
      )
      .catch((err) => res.status(400).json("Error:" + err));
  });

  module.exports = router;