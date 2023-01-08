const express = require('express');
const router = express.Router();

const Appointment = require('../../models/appointments.model');

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const appointment = await Appointment.find({
      userId: userId,
      // paymentStatus: 'success'
    }).lean()
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'user',
    //         localField: 'vetDetail',
    //         foreignField: 'userId',
    //         as: 'myCustomResut',
    //       },
    //     },
    //   ])
    //   .exec((err, result) => {
    //     console.log("res", result)
    //     if (err) {
    //       console.log('error', err);
    //     }
    //     if (result) {
    //       console.log(result);
    //     }
    //   });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
