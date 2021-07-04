const router = require("express").Router();
const signUp = require("../models/SignUpModel");
const bcrypt = require("bcryptjs");
const uCookies = require("universal-cookie");
const { tokenGenerator } = require("../helpers/tokens");
const authVerify = require("../helpers/authVerify");

const SALT_WORK_FACTOR = 10;
const cookies = new uCookies();

router.post('/signUp', async (req, res) => {
    try {
        //check email exists in db
        const emailExists = await signUp.findOne({ email: req.body.email});
        if(emailExists) {
            //database has the email already
            return res.status(400).send({ message : "Email ID already exists!!!" });
        }

        // Generate a salt and hash for the password
        const psalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        req.body.password = await bcrypt.hash(req.body.password, psalt);

        //Assigning user data to schema
        const newUser = new signUp({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            userType: req.body.userType,
            password: req.body.password
        });

        //save the new user to database
        const savedUser = await newUser.save();
        res.status(200).send({ message: "Thanks for registering" });
    } catch(err) {
        res.status(400).send({ message: err });
    }
});

router.post('/userLogin', async (req, res) => {
    const { lemail, lpassword } = req.body;
    try{
        //check email exists in db
        const userData = await signUp.findOne({ email: lemail });
        if(!userData) {
            //if no email in the database throw error
            return res.status(400).send({ message : "NOT a registered Email ID !!!" });
        }

        //Compare the user login form password with db password
        let validPwd = await bcrypt.compare(lpassword, userData.password);
        if(!validPwd) {
            //invalid password throw error
            return res.status(400).send({ message: "Invalid password!!!" });
        }
        
        //Generate & Set JWT token for valid user
        const jwtUserToken = await tokenGenerator(userData.email);
        if(jwtUserToken) {
            cookies.set('uajt', jwtUserToken, {
                sameSite: "strict",
                path: "/",
                httpOnly: true, 
                maxAge: 24 * 60 * 60 * 1000 // 1day 
            });
            res.status(200).send({ message: 'Login success', jtoken: jwtUserToken});
        }
        else {
            res.status(400).send({ message: 'Invalid user' });
        }
    } catch(err) {
        res.status(400).send({ message: err });
    }
});

router.get('/dashboard', authVerify, (req, res) => {
    console.log('Protected dashboard');
});

router.get('/getUserData', async(req, res) => {
    try {
        const allUsers = await signUp.find();
        if(!allUsers) {
            //invalid password throw error
            res.status(200).send({ message: "No users" });
        } else {
            res.status(200).send({ message: allUsers});
        }
    } catch(err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;