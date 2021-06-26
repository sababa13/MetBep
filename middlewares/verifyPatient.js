const db = require("../models");
const ROLES = db.ROLES;
const Patient = db.patient;

verifyIfPatientAlreadyExists = (req, res, next) => {
  Patient.findOne({
    idnp: {$in: [req.body.idnp]}
  }).exec((err, patient) => {
    if (!patient) {
      Patient.create({
        first_name_patient: req.body.first_name_patient,
        last_name_patient: req.body.last_name_patient,
        idnp: req.body.idnp,
        gender: req.body.gender,
        birth: req.body.birth,
        patient_address: req.body.patient_address,
        personal_phone_patient: req.body.personal_phone_patient
      })
      if (err) {
        console.log({ message: `The system can not create a new patient: ${err}` });
        return;
      }
      else {
        console.log({ message: "New patient has been successfully added to the database." });
        return res;
      }
    }
    else { 
      console.log({message: `Find record by IDNP: ${patient.idnp}`});
      // console.log("Print data from Database: ", patient);
      Patient.updateOne({idnp: { $in: patient.idnp }},
        {$set: 
          {
            first_name_patient:     req.body.first_name_patient,
            last_name_patient:      req.body.last_name_patient,
            gender:                 req.body.gender,
            birth:                  req.body.birth,
            patient_address:        req.body.patient_address,
            personal_phone_patient: req.body.personal_phone_patient
          }},
          {upsert: true, rawResult: true, useFindAndModify: false}, // Return the raw result from the MongoDB driver
          function ( err ) {
            if ( err ) {
              console.log({ message: `The system can not update an existing patient: ${err}` });
              return;
            }
            else
            {
              console.log({ message: `The patient idnp:  ${patient.idnp} was found and data was successfully updated.` });
              return;
            }
          }
      );//.catch(err => console.error(`Failed to add review: ${err}`))
    }

    // next();
  });
  next();
}

checkRolePatientExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  
  next();
};
  
const verifyPatient = {
  verifyIfPatientAlreadyExists,
  checkRolePatientExisted
};

module.exports = verifyPatient;