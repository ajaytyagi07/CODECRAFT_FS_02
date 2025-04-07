const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;
