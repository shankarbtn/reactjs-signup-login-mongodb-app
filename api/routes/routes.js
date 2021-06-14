const express = require("express");
const router = express.Router();
const signUpModel = require("../models/SignUpModel");

router.post('/signup', async (req, res) => {
    //const { fullName, userName, email, password } = req.body;
    const newUser = new signUpModel({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password
    });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Signup Error: ", err);
        res.status(500).json({ error: "Cannot register user at the moment!" });
    });

    if (savedUser) res.json({ message: "Thanks for registering" });

    // try {
    //     const savedPost = await userData.save();
    //     res.json(savedPost);
    // } catch(err) {
    //     res.json({ message: err })
    // }
});

module.exports = router;