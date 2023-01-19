const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentEnum = new mongoose.Schema({
  value: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
  },
});

const appointmentSchema = new Schema(
  {
    userId: String,
    vetId: String,
    bookedSlot: String,
    bookingDate: Date,
    userName: String,
    petName: String,
    petAge: String,
    contactNo: String,
    email: String,
    paymentStatus: [{ type: String, refs: paymentEnum }]
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model('appointment', appointmentSchema);

module.exports = appointmentModel;
