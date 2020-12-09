const dbCon = require('../../config/Connection.js');

const User = (user) => {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.password = user.password;
    this.created_at = new Date();
    this.updated_at = new Date();
};

exports.findAll = (result) => {
    dbCon.query("SELECT * FROM users", (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("users :", res);
            result(null, res);
        }
    });
};

exports.create = (create, result) => {
    dbCon.query("INSERT INTO users SET ?", create, (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

exports.findById = (id, result) => {
    dbCon.query("SELECT * FROM users WHERE id = ?", [id], (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("user :", err);
            console.log(null, res);
        }
    });
};

exports.update = (id, user, result) => {
    dbCon.query("UPDATE FROM users SET first_name = ?, last_name = ?, username = ?, password = ? WHERE id = ?", [user.first_name, user.last_name, user.username, user.password, id], (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("user :", res);
            result(null, res);
        }
    });
};

exports.delete = (id, result) => {
    dbCon.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
        if(err)
        {
            console.log("error :", err);
            result(null, err);
        }
        else
        {
            console.log("user :", res);
            result(null, res);
        }
    });
};

module.exports = User;