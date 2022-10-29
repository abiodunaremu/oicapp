"altarCall strict";

const AltarCall = function (altarCall) {
  this.firstName = altarCall.firstName,
  this.lastName = altarCall.lastName,
  this.email = altarCall.email,
  this.gender = altarCall.gender,
  this.contactNumber = altarCall.contactNumber,
  this.contactAddress = altarCall.contactAddress, 
  this.prayerRequest = altarCall.prayerRequest
};

AltarCall.create = function (altarCall, result) {
  connection.query("INSERT INTO altarCall set ?", altarCall, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: "+res.insertId);
    }
  });
};

AltarCall.read = function (result) {
  connection.query("SELECT * FROM altarCall", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

AltarCall.update = function (id, altarCall, result) {
  connection.query("UPDATE altarCall SET ? WHERE _id = ?", [altarCall, id], function (
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
  connection.query("DELETE FROM altarCall WHERE _id = ?", [id], function (
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

module.exports = AltarCall;
