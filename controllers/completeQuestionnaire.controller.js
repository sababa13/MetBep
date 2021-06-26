const { concatSeries } = require("async");
const { ObjectId } = require("bson");
const { patientQuestionnaire, patient } = require("../models");
const db = require("../models");
const PatientQuestionnaire = db.patientQuestionnaire;
const Patient              = db.patient;

exports.completeQuestionnaire = (req, res) => {
  const patientQuestionnaire = new PatientQuestionnaire ({
    adresa_solicitarii:            req.body.adresa_solicitarii,
    nr_telefon_solicitant:         req.body.nr_telefon_solicitant,
    motivul_solicitarii:           req.body.motivul_solicitarii,
    dispecer:                      req.body.dispecer,
    residence:                     req.body.residence,
    social_statute:                req.body.social_statute,
    solicitare:                    req.body.solicitare,
    done_by:                       req.body.done_by,
    locul_solicitarii:             req.body.locul_solicitarii,
    categorii_solicitari_urgente:  req.body.categorii_solicitari_urgente,
    rezultatul_solicitarii:        req.body.rezultatul_solicitarii,
    starea_generala:               req.body.starea_generala,
    solicitarea_transmisa_catre:   req.body.solicitarea_transmisa_catre,
    diagnostic_prezumtiv:          req.body.diagnostic_prezumtiv,
    gradul_de_urgenta:             req.body.gradul_de_urgenta,
    complicatii:                   req.body.complicatii,
    eficacitatea_masurilor:        req.body.eficacitatea_masurilor,
    acuzele_anamneza:              req.body.acuzele_anamneza,
    starea_de_constienta:          req.body.starea_de_constienta,
    scala_glasgow:                 req.body.scala_glasgow,
    pupilele:                      req.body.pupilele,
    examenul_neurologic:           req.body.examenul_neurologic,
    tegumentele:                   req.body.tegumentele,
    caile_respiratorii:            req.body.caile_respiratorii,
    auscultatia_pulmonara:         req.body.auscultatia_pulmonara,
    raluri:                        req.body.raluri,
    dispnee:                       req.body.dispnee,
    puls:                          req.body.puls,
    zgomote_cardiace:              req.body.zgomote_cardiace,
    aparatul_digestiv:             req.body.aparatul_digestiv,
    aparatul_urinar:               req.body.aparatul_urinar,
    dereglari_psihice:             req.body.dereglari_psihice,
    trauma:                        req.body.trauma,
    tipul_traumei:                 req.body.tipul_traumei,
    status_local:                  req.body.status_local,
    manevre_proceduri:             req.body.manevre_proceduri,
    medicatie:                     req.body.medicatie,
    parametrii_dupa_acordarea_amu: req.body.parametrii_dupa_acordarea_amu,
    starea_dupa_acordarea_amu:     req.body.starea_dupa_acordarea_amu,
    modalitatea_practica:          req.body.modalitatea_practica,
    echipa_amu:                    req.body.echipa_amu
  });

  patientQuestionnaire.save((err, patientQuestionnaire) => {
    if (err) {
      console.log({ message: `Something goes wrong: ${err}` });
      return;
    }

    if (req.body.patients) {
      Patient.find(
        {
          idnp: { $in: req.body.patients }
        },
        (err, patients) => {
          if (err) {
            console.log({ message: `The system does not find the role: ${err}` });
            return;
          }

          patientQuestionnaire.patients = patients.map(patient => patient._id);
          patientQuestionnaire.save(err => {
            if (err) {
              console.log({ message: `Something went wrong while saving: ${err}`});
              return;
            }
          });
        }
      );
    } else {
      Patient.findOne({ idnp: req.body.idnp }, (err, patient) => {
        if (err) {
          console.log({ message: `Can not find a record by IDNP: ${err}`});
          return;
        }

        patientQuestionnaire.patients = [patient._id];
        patientQuestionnaire.save(err => {
          if (err) {
            console.log({ message: `Something went wrong while saving ID: ${err}` });
            return;
          }
        });
      });
    }
    res.status(200).send("The questionnaire was completed and saved in the database.");
    return;
  });
}

exports.getAllPatientQuestionnaires = (req, res) => {
  Patient.findOne({
    idnp: req.params.idnp
  }, function(err, patient) {
    if (!err && patient) {
      PatientQuestionnaire.find({patients: patient._id}, function(error, patientQuestionnaire){
        if (!error && patientQuestionnaire) {
          console.log(' idnp: ',  req.params.idnp);
          console.log(' patient _id: ',  patient._id);
          patient.patientQuestionnaire = patientQuestionnaire;
        } else {
          patient.patientQuestionnaire = [];
        }
        res.send(patientQuestionnaire);
      });
    }
  });
}

exports.getDataAboutPatient = (req, res) => {
  Patient.findOne({
    idnp: req.params.idnp
  }, function (err, patient) {
      if (!err && patient) {
        PatientQuestionnaire.find({patients: patient._id}, function(error, patientQuestionnaire){
          if (!error && patientQuestionnaire) {
            patient.patientQuestionnaire = patientQuestionnaire;
          } else {
            patient.patientQuestionnaire = [];
          }
          res.send(patient);
        });
      }
    }
  );
}

exports.getRegisteredPatients = (res) => {
  Patient.find({}, {_id: 0, roles: 0, gender: 0, patiet_address: 0, personal_phone_patient: 0, __v: 0}
    , function (err) {
      if (err) {
        console.log({ message: `Something went wrong : ${err}` });
      }
      res.send(patient);
    }
  );
  //https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d
  //https://stackoverflow.com/questions/25589113/how-to-select-a-single-field-for-all-documents-in-a-mongodb-collection
  // Patient.aggregate( {$project: {_id: 0, roles: 0, gender: 0, patiet_address: 0, personal_phone_patient: 0, __v: 0}});
  // res.send(patient);
};

// exports.getRegisteredQuestionnaireQuantityToday = (res) => {
//   // Estimate the total number of documents in the collection
//   // and print out the count.
//   PatientQuestionnaire.estimatedDocumentCount({},
//     function(error, numOfDocs){
//       if(error) return error;
//       console.log(`Estimated number of documents in the Patient Questionnaire collection: ${numOfDocs}`);
//       // return numOfDocs;
//       res.send(numOfDocs);
//     }
//   );
// }