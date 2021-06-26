const mongoose = require("mongoose");

const PatientQuestionnaire = mongoose.model(
  "Patient Questionnaire",
  new mongoose.Schema(
    {
      created_at: {type: Date, default: Date.now},
      adresa_solicitarii: {type: String},
      nr_telefon_solicitant: {type: Number, trim: true, minlength: 9},
      motivul_solicitarii: {type: String},
      dispecer: {type: String},
      residence: {type: String, required: true, trim: true},
      social_statute: {type: String},
      solicitare: {type: String},
      done_by: {type: [String]},
      locul_solicitarii: {type: [String]},
      categorii_solicitari_urgente: {type: String},
      rezultatul_solicitarii: {type: String},
      starea_generala: {type: String},
      solicitarea_transmisa_catre: {type: [String]},
      diagnostic_prezumtiv: {type: String},
      gradul_de_urgenta: {type: String},
      complicatii: {type: [String]},
      eficacitatea_masurilor: {type: String},
      acuzele_anamneza: {type: String},
      starea_de_constienta: {type: String},
      scala_glasgow: {type: Number},
      pupilele: {type: String},
      examenul_neurologic: {type: [String], enum: ["Parexa mem. sup.", "Pareza mem. inf.", "Plegie mem. sup.", "Plegie mem. inf."]},
      tegumentele: {type: String},
      caile_respiratorii: {type: String},
      auscultatia_pulmonara: {type: String, enum: ["Respiratie veziculara", "Murmur vezicular diminuat", "Respiratie aspra", "Suflu bronsie", "Respiratie absenta"]},
      raluri: {type: String, enum: ["Crepitante", "Ronflante", "Sibilante"]},
      dispnee: {type: String},
      puls: {type: String},
      zgomote_cardiace: {type: String},
      aparatul_digestiv: {type: String},
      aparatul_urinar: {type: String},
      dereglari_psihice: {type: String},
      trauma: {type: String},
      tipul_traumei: {type: [String]},
      status_local: {type: String},
      manevre_proceduri: {type: [String]},
      medicatie: {type: String},
      parametrii_dupa_acordarea_amu: {type: String},
      starea_dupa_acordarea_amu: {type: String},
      modalitatea_practica: {type: [String]},
      echipa_amu: {type: [String]},
      patients: [{type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true, trim: true}]
    }
  )
);
module.exports = PatientQuestionnaire;