const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema(
    {
      first_name: {type: String, required: true, trim: true, maxlength: 30},
      last_name: {type: String, required: true, trim: true, maxlength: 30},
      username: {type: String, unique: true, maxlength: 30},
      gender: {type: String, enum: ["male", "female"]},
      password: {type: String, required: true, minlength: 7},
      email: {type: String, required: true, lowercase: true, trim: true, unique: true, sparse: true},
      city: {type: String, unique: false},
      medical_institution: {type: String, required: true, trim: true, unique: false},
      medical_institution_address: {type: String, required: true, trim: true, unique: false},
      personal_phone: {type: Number, unique: true, trim: true, minlength: 9},
      roles: [{type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true, trim: true}]
    }
  )
);

module.exports = Employee;