"AltarCall strict";
var nodemailer = require('nodemailer');
const path = require('path');
const viewPath =  path.resolve(__dirname, './templates/views/');
const hbs = require('nodemailer-express-handlebars');
const express = require('express');
const partialsPath = path.resolve(__dirname, './templates/partials');

const AltarCall = function (altarCall) {
  this.firstName = altarCall.firstName,
  this.lastName = altarCall.lastName,
  this.email = altarCall.email,
  this.gender = altarCall.gender,
  this.contactNumber = altarCall.contactNumber,
  this.contactAddress = altarCall.address, 
  this.prayerRequest = altarCall.prayerRequest
};

AltarCall.create = function (altarCall, result) {
  connection.query("INSERT INTO altarCalls set ?", altarCall, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);      
      sendEmail(altarCall.email, altarCall.firstName);
    }
  });
};

AltarCall.read = function (result) {
  connection.query("SELECT * FROM altarCalls", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

AltarCall.update = function (id, altarCall, result) {
  connection.query("UPDATE altarCalls SET ? WHERE _id = ?", [altarCall, id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

AltarCall.delete = function (id, result) {
  connection.query("DELETE FROM altarCalls WHERE _id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

function sendEmail(userEmail, firstName){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oasisoiconference@gmail.com',
      pass: 'pfxcgbxtslnsqwax' 
    }
  });
  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      express
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))
  var mailOptions = {
    from: 'RCCG The Oasis',
    to: userEmail,
    subject: 'Altar Call',
    template: 'altarcall',
    context: {            
      firstName : firstName       
      }
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Subscribe email sent: ' + info.response);
    }
  });
 }

module.exports = AltarCall;
