const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require('./models/user');
const EmployeeModel = require('./models/employee')

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/CodeCraftT1");

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record exists!");
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get('/', (req, res) => {
    EmployeeModel.find({})
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
});
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findById({ _id: id })
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.eamil,
        age: req.body.age
    })
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})
app.post('/createUser', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.listen(8080, () => {
    console.log("Server is running");
})