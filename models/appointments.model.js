const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const appointmentSchema = new Schema(
  {
    userId: ObjectId,
    vetId: ObjectId,
    bookedSlot: String,
    bookingDate: Date,
    userName: String,
    petName: String,
    petAge: Number,
    contactNo: Number,
    email: String,
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = appointmentModel;