const config = require("../config/auth.config");
const db = require("../models");
const Employee = db.employee;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    gender: req.body.gender,
    email: req.body.email,
    city: req.body.city,
    medical_institution: req.body.medical_institution,
    medical_institution_address: req.body.medical_institution_address,
    personal_phone: req.body.personal_phone,
    password: bcrypt.hashSync(req.body.password, 7)
  });

  employee.save((err, employee) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          role_name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          employee.roles = roles.map(role => role._id);
          employee.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully." });
          });
        }
      );
    } else {
      Role.findOne({ role_name: "employee" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        employee.roles = [role._id];
        employee.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully." });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
    Employee.findOne({
    username: req.body.username
  })
    .populate("roles", "__v")
    .exec((err, employee) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!employee) {
        return res.status(404).send({ message: "You have entered an invalid username or password." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        employee.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "You have entered an invalid username or password."
        });
      }

      var token = jwt.sign({ id: employee.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < employee.roles.length; i++) {
        authorities.push(employee.roles[i]);
      }
      res.status(200).send({
        id: employee._id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        username: employee.username,
        gender: employee.gender,
        email: employee.email,
        city: employee.city,
        medical_institution: employee.medical_institution,
        medical_institution_address: employee.medical_institution_address,
        personal_phone: employee.personal_phone,
        roles: authorities,
        accessToken: token
      });
    });
};