const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const daysEnum = new mongoose.Schema({
  value: {
    type: String,
    enum: [0, 1, 2, 3, 4, 5, 6], //Sunday:0, Monday:1 & so on....
  },
});

const availabilitySchema = new Schema(
  {
    vetId: ObjectId,
    vetName: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const availabilityModel = mongoose.model('availability', availabilitySchema);

module.exports = availabilityModel;
