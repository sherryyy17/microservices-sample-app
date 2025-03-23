const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - User Service"))
    .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const newUser = new User({ name: req.body.name });
    await newUser.save();
    res.json(newUser);
});

app.listen(5001, () => console.log("User Service running on port 5001"));
