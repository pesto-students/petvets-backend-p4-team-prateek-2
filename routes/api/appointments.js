const express = require("express");
const moment = require('moment');
const router = express.Router();


const Appointment = require("../../models/appointments.model");

router.get("/", async (req, res) => {
    const vetId = req.query.vetId;
    const dateQuery = req.query.date;
  
    if (!vetId || !dateQuery) {
      res.status(400).json("require vetId & date");
      return;
    }
    const dateString = dateQuery.toString()
    const startTime = moment(dateString);
    const endTime = moment(dateString);

    try {
      const appointment = await Appointment.find({ vetId: vetId, bookingDate: { $gte: moment(startTime).startOf('day').format('llll'), $lt: moment(endTime).endOf('day').format('llll')} })
      res.status(200).json(appointment);
    }
    catch(error){
      res.status(500).json({ message: error });
    }

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