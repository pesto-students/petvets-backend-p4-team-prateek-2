const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daysEnum = new mongoose.Schema({
  value: {
    type: String,
    enum: [0, 1, 2, 3, 4, 5, 6], //Sunday:0, Monday:1 & so on....
  },
});

const userSchema = new Schema(
  {
    userId: { type: String, require: true },
    role: { type: String, enum: ['user', 'doctor', 'admin'], require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    dob: Number,
    degree: { type: Array },
    firebase_auth_data: {},
    gender: { type: String, enum: ['male', 'female'] },
    mobile: Number,
    email: { type: String, require: true },
    isEmailVerified: Boolean,
    clinicName: { type: String, default: null },
    clinicAddress1: { type: String, default: null },
    clinicAddress2: { type: String, default: null },
    clinicCity: { type: String, default: null },
    clinicState: { type: String, default: null },
    clinicPincode: { type: String, default: null },
    clinicContactNo: { type: String, default: null },
    yearsOfExperience: { type: String, default: null },
    clinicDaysOff: { type: Array },
    clinicEmail: { type: String, default: null },
    consultationFee: { type: Number, default: 0 },
    license: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    specialization: {
      type: String,
      enum: ['dog', 'cat', 'bird', 'cattle', 'all'],
    },
    services: String,
    profileURL: {
      type: String,
    },
    about: String,
    startTime: String,
    endTime: String,
    constantDaysOff: [{ type: Number, refs: daysEnum }],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
