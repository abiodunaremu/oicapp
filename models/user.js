"user strict";
var nodemailer = require('nodemailer');
const path = require('path');
const viewPath =  path.resolve(__dirname, './templates/views/');
const hbs = require('nodemailer-express-handlebars');
const express = require('express');
const partialsPath = path.resolve(__dirname, './templates/partials');

const User = function (user) {
  this.firstName = user.firstName,
  this.lastName = user.lastName,
  this.email = user.email,
  this.gender = user.gender,
  this.isMember = user.isMember,
  this.yearJoinOasis = user.yearJoinOasis,
  this.isWorker = user.isWorker,
  this.department = user.department,
  this.phoneNumber = user.phoneNumber,
  this.whatsappNumber = user.whatsappNumber,
  this.ageRange = user.ageRange,
  this.hasMedicalCondition = user.hasMedicalCondition,
  this.isMedicalPractitioner = user.isMedicalPractitioner,
  this.canLiftHeavyObject = user.canLiftHeavyObject,
  this.isWorkOffWork = user.isWorkOffWork,
  this.daysToBeAvailable = user.daysToBeAvailable,
  this.preferredTeam = user.preferredTeam,
  this.mediaSkill = user.mediaSkill
 // this.createdAt = new Date();
 // this.updatedAt = new Date();
};

User.create = function (user, result) {
  connection.query("INSERT INTO users set ?", user, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);      
      sendEmail(user.email, user.firstName);
    }
  });
};

User.read = function (result) {
  connection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  connection.query("UPDATE users SET ? WHERE _id = ?", [user, id], function (
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

User.delete = function (id, result) {
  connection.query("DELETE FROM users WHERE _id = ?", [id], function (
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
      // partialsDir: viewPath,
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      express
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))
  var mailOptions = {
    from: 'oasisoiconference@gmail.com',
    to: userEmail,
    subject: 'Successful Submission of Form',
    template: 'index',
    //text: `Dear ${firstName},\nThank you for volunteering to serve at this years OIC.\n We are delighted and looking forward to having you give yourself to God as He grants you grace.\n We pray that the Lord keeps you steadfast in Jesus’ name,Amen!\n\nWith Love,OCPC Volunteer Coordinator,\n\nOIC 2022`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 }

module.exports = User;
