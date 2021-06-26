const db = require("../models");
var bcrypt = require("bcryptjs"),
  async = require('async'),
  crypto = require('crypto'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  forgot_config = require('../config/forgot.config');
const Employee = db.employee;

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'SendGrid',
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    host: 'smtp.sendgrid.net',
    auth: {
      user: forgot_config.mailer.auth.username, // generated ethereal user
      pass: forgot_config.mailer.auth.password // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false //If the host does not have a valid certificate you can allow it in the transport settings with this option
  }
}));

exports.forgotPassword = function(req, res) {
  async.waterfall([
    function(done) {
      Employee.findOne({
        email: req.body.email
      }).exec((err, employee) => {
        console.log('Email: ', req.body.email);
        if (employee) {
          done(err, employee);
        } 
        else {
          done('No account with that email address exists.');
          return res.redirect('/users/forgot-password');
        }
      });
    },
    function(employee, done) {
      // create the random token
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        done(err, employee, token);
      });
    },
    function(employee, token, done) {
      Employee.findByIdAndUpdate({ _id: employee._id }, { reset_password_token: token, reset_password_expires: Date.now() + 3600000}, { upsert: true, new: true }).exec(function(err, new_employee) {
        done(err, token, new_employee);
      });
    },
    function(token, employee, done) {
      var mailOptions = {
        to: employee.email,
        from: 'ejovaekaterina@gmail.com',
        subject: 'MetBep Forgot Password',
        text: `Hi ${employee.username},\n\n` +
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/users/reset-password/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n\n\n' +
        'Cheers,\n' +
        'The MetBep Team.'
      };

      transporter.sendMail(mailOptions, function(err) {
        if (!err) {
          return res.json({ message: 'An e-mail has been sent to ' + employee.email + ' with further instructions.' });
        } else {
          return done(err);
        }
      });
    }
  ], function(err) {
    return res.status(422).json({ message: err });
  });
};

exports.resetPassword = function(req, res) {
  Employee.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, employee) {
    if (!err && employee) {
      if (req.body.newPassword === req.body.verifyPassword) {
        employee.password = bcrypt.hashSync(req.body.newPassword, 10);
        employee.reset_password_token = undefined;
        employee.reset_password_expires = undefined;
        employee.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var mailOptions = {
              to: employee.email,
              from: 'ejovaekaterina@gmail.com',
              subject: 'MetBep Password Reset Confirmation',
              text: `Hi ${employee.username},\n\n` +
                `This is a confirmation that the password for your account has just been changed.\n\n` +
                'Cheers,\n' +
                'The MetBep Team.'
            };

            transporter.sendMail(mailOptions, function(err) {
              if (!err) {
                return res.json({ message: 'Reset your password has been sent successfully.' });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      });
    }
  });
};