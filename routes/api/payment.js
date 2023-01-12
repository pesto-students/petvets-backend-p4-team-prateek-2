const express = require("express");
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const router = express.Router();

require("dotenv").config();

const Appointment = require("../../models/appointments.model");

router.post('/', (req, res) => {
  const user = req.user
  Appointment.save((err, data) => {
    if (err) {
      res.status(500).json({ 'msg': 'Database Error Occured!' });
    } else {
      // this.paymentTandom(req.user)
      stripe.customers.create({
        email: user.email,
        // source: req.body.stripeToken,
        name: user.firstName + user.lastName,
        address: {
          line1: user.address,
          postal_code: user.zipCode,
          city: user.city,
          state: user.state,
          country: user.country,
        }
      })
        .then(async (customer) => {
          const card_token = await stripe.tokens.create({
            card: {
              name: user.firstName + user.lastName,
              number: req.body.cardNumber,
              exp_month: req.body.cardMonth,
              exp_year: req.body.cardYear,
              cvc: req.body.cardCvv
            }
          })
          await stripe.customers.createSource(customer.id, { source: `${card_token.id}` })
          return stripe.paymentIntents.create({
            amount: 2500,     // Charging Rs 25
            description: 'Booked Appointment',
            currency: 'USD',
            customer: customer.id
          });
        })
        .then((charge) => {
          console.log('success')
          res.status(200).json({ 'status': true, 'msg': 'Success' });  // res.send("Success")  // If no error occurs
          // res.send("Success")  // If no error occurs
        })
        .catch(async (err) => {
          // delete insurance if payment unsuccessful
          await Appointment.deleteOne({ _id: data._id });
          console.log(err)
          // res.status(500).json({ 'msg': err }); // If some error occurs
          res.send(err)       // If some error occurs
        });
    }
  });
});

module.exports = router;