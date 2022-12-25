const express = require("express");
const router = express.Router();

const Availability = require("../../models/availability.model");

router.get("/", (req, res) => {
  let vetId = req.query.vetId;
  if (!vetId) {
    res.status(400).json("require vetId");
    return;
  }
  Availability.find({ vetId: vetId, status: "approved" })
    .then((result) => res.status(200).send(result[0]))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.post("/", (req, res) => {
  const availability = new Availability(req.body);
  availability
    .save()
    .then(() => res.json("availability added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.patch("/:id", (req, res) => {
    Availability.findOneAndUpdate({ vetId: req.params.id }, { $set: req.body })
    .then(() => {
      res.status(200).send("profile updated");
    })
    .catch((err) => res.status(500).json("Error:" + err));
  });

module.exports = router;
