"subscribe strict";
const Subscriber = function (subscriber) {
  this.email = subscriber.subscriber
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

Subscriber.create = function (subscriber, result) {
  connection.query("INSERT INTO subscribers set ?", subscriber, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, "successful: " + res.insertId);      
    }
  });
};

module.exports = Subscriber;
