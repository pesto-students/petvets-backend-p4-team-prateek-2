const express = require('express');
const router = express.Router();

const Appointment = require('../../models/appointments.model');
const User = require('../../models/users.model');

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  return Appointment.find({
    userId: userId,
    // paymentStatus: 'success'
  })
    .then((result) => {
      result.map((app) => {
        return User.find({
          userId: app.vetId,
        }).then((user) => {
          app['vetDetail'] = user[0];
          res.status(200).json(result);
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

module.exports = router;
