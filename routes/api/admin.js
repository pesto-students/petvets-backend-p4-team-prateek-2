const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

router.post('/sendEmail', async (req, res) => {
  const { status, userData } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: userData.email, // Change to your recipient
    from: 'hobbybobby3333@gmail.com', // Change to your verified sender
    subject: `PetVet application is ${status}`,
    html: `<strong>Hi ${userData.firstName} ${userData.lastName}, </strong>`,
    text: `Your application has been ${status}`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
    res.status(response[0].statusCode).json();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
