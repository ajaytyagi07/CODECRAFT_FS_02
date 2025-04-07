const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const UserModel = require("./models/user");
const EmployeeModel = require("./models/employee");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Session and Passport config
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/CodeCraftT1")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

// Passport Local Strategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
};

// ---- Routes -----

app.get("/", isAuthenticated, async (req, res) => {
    try {
        const employees = await EmployeeModel.find({ createdBy: req.user._id });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch employees", error: err.message });
    }
});


app.get("/getUser/:id", isAuthenticated, async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        if (employee.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to view this employee" });
        }

        res.json(employee);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.post("/createUser", isAuthenticated, (req, res) => {
    EmployeeModel.create({
        ...req.body,
        createdBy: req.user._id
    })
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json(err));
});


app.put("/updateUser/:id", isAuthenticated, async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "User not found" });

        if (employee.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updated = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.delete("/deleteUser/:id", isAuthenticated, async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "User not found" });

        if (employee.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const deleted = await EmployeeModel.findByIdAndDelete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        req.login(newUser, (err) => {
            if (err) return res.status(500).json({ message: "Login after register failed" });
            return res.status(200).json({ message: "Signup successful", user: newUser });
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ message: "Internal server error" });
        if (!user) return res.status(400).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed" });
            return res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next);
});


app.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.status(200).json({ message: "Logged out" });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
