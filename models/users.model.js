const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daysEnum = new mongoose.Schema({
  value: {
    type: String,
    enum: [0, 1, 2, 3, 4, 5, 6], //Sunday:0, Monday:1 & so on....
  },
});

const userSchema = new Schema({
  userId: { type: String, require: true },
  role: { type: String, enum: ['user', 'doctor', 'admin'], require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dob: Date,
  firebase_auth_data: {},
  gender: { type: String, enum: ['male', 'female'] },
  contactNo: Number,
  email: { type: String, require: true },
  isEmailVerified: Boolean,
  clinicName: { type: String, default: null },
  clinicAddress: { type: String, default: null },
  yearsOfExperience: { type: String, default: null },
  clinicContactNo: { type: String, default: null },
  clinicEmail: { type: String, default: null },
  license: {
    data: Buffer,
    contentType: String,
  },
  consultationFee: { type: Number, default: 0 },
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
  image: {
    data: Buffer,
    contentType: String,
  },
  about: String,
  startTime: String,
  endTime: String,
  constantDaysOff: [{ type: Number, refs: daysEnum }],
},{
  timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
