const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
      role_name: [{type: String, required: true, maxlength: 10}]
    }
  )
);

module.exports = Role;