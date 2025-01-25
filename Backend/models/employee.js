const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;