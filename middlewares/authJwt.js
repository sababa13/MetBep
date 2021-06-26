const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Employee = db.employee;
const Role = db.role;
const Patient = db.patient;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.employeeId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Employee.findById(req.employeeId).exec((err, employee) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: employee.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role_name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isEmployee = (req, res, next) => {
  Employee.findById(req.employeeId).exec((err, employee) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: employee.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role_name === "employee") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Employee Role!" });
        return;
      }
    );
  });
};

isPatient = (req, res, next) => {
  Patient.findById(req.patientId).exec((err, patient) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: patient.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role_name === "patient") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Patient Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployee,
  isPatient
};
module.exports = authJwt;