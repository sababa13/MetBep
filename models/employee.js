var Schema = mongoose.Schema;

var employeeSchema = new Schema(
  {
    _id: {type: Number, required: true},
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    user_name: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, minlength:8, maxlength: 20},
    email: {type: String, required: true, maxlength: 100},
    mobile: {type: Number},
    phone: {type: Number},
  }
);

// Virtual for employee's full name
employeeSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for employee's mobile number
employeeSchema
.virtual('mobile')
.get(function () {
  return (this.mobile).toString();
});

// Virtual for employee's URL
employeeSchema
.virtual('url')
.get(function () {
  return '/models/employee/' + this._id;
});

//Export model
module.exports = mongoose.model('Employee', employeeSchema);