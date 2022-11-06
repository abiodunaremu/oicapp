"subscribe strict";
var nodemailer = require('nodemailer');
const path = require('path');
const viewPath =  path.resolve(__dirname, './templates/views/');
const hbs = require('nodemailer-express-handlebars');
const express = require('express');
const partialsPath = path.resolve(__dirname, './templates/partials');

const Subscriber = function (subscriber) {
  this.email = subscriber.email
};

Subscriber.read = function (result) {
  connection.query("SELECT * FROM subscribers", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Subscriber.update = function (id, subscribe, result) {
  connection.query("UPDATE subscribers SET ? WHERE _id = ?", [subscribe, id], function (
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

Subscriber.delete = function (id, result) {
  connection.query("DELETE FROM subscribers WHERE _id = ?", [id], function (
    err,res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Subscriber.createSubscriber = function (subscribe, result) {
  connection.query("INSERT INTO subscribers set ?", subscribe, function (err, res) {
    if (err) {      
      if(err.sqlMessage.includes("Duplicate") && err.sqlMessage.includes("email")){
        result(null, "Error: Duplicate email");  
      } else {
        result(err, null);
      }
    } else {
      result(null, "successful: " + res.insertId);               
      sendEmail(subscribe.email); 
    }
  });
};

function sendEmail(userEmail){

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
    sender: 'RCCG The Oasis',
    to: userEmail,
    subject: 'Welcome to The Oasis',
    template: 'subscribe',
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Subscribe email sent: ' + info.response);
    }
  });
 }

module.exports = Subscriber;
