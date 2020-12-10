const Employee = require("../../Models/EmployeeModel.js");

exports.findAll = (req, res) => {
    Employee.findAll()
}