const mongoose = require("mongoose");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema(
    {
      first_name_patient: {type: String, required: true, trim: true, maxlength: 30},
      last_name_patient: {type: String, required: true, trim: true, maxlength: 30},
      idnp: {type: String, required: true, trim: true},
      gender: {type: String, enum: ["male", "female"]},
      birth: {type: Date},
      patient_address: {type: String, required: true, trim: true, unique: false},
      personal_phone_patient: {type: Number, trim: true, minlength: 9},
      roles: [{type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true, trim: true}],
      updated_date: {type: Date, default: Date.now}
    }
  )
);

module.exports = Patient;