const express = require('express');
const router = express.Router();
const SignUp = require('../models/signUp')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../midddleware/adminAuth')
const upload = require('../midddleware/upload');
const { route } = require('./cartRoute');

router.post('/signUp', [
    check('name', "please enter your name").not().isEmpty(),
    check('email', "invalid email").isEmail(),
    check('password', "password is required").not().isEmpty()

], function (req, res) {
    const error = validationResult(req);

    if (error.isEmpty()) {
        const name = req.body.name
        const email = req.body.email
        const userName = req.body.userName
        const password = req.body.password
        const loginfrom = req.body.loginfrom
        const profileImage = req.body.userImage
        bcryptjs.hash(password, 10, function (err, hash) {

            const signup = new SignUp({ name: name, email: email, userName: userName, password: hash, loginfrom: loginfrom, profileImage: profileImage })
            signup.save()
                .then(function () {
                    res.status(201).json({ success: true, message: "Registered!!" })
                })
                .catch(function () {
                    res.status(500).json({ success: false, message: err })
                })
        })

    }
    else {
        res.status(400).json(error.array())
    }
})

// login 

router.post('/logIn', function (req, res) {
    const userName = req.body.userName
    const password = req.body.password
    const loginfrom = req.body.loginfrom
    console.log(password)
    SignUp.findOne({ userName: userName })
        .then(function (clientData) {
            if (clientData === null) {
                return res.status(401).json({ message: "userName or password is incorrect!!" })
            }

            bcryptjs.compare(password, clientData.password, function (err, result) {
                if (result === false) {
                    return res.status(403).json({ success: false })
                }
                const token = jwt.sign({ userId: clientData._id }, 'sercretkey');
                res.status(200).json({
                    success: true,
                    token: token,
                    data: [clientData],
                    userId: clientData._id
                })
            })


        })
        .catch(function (err) {
            res.status(201).json({ massage: err })
        })
})


router.get('/getMe', auth.verifyUser, function (req, res) {
    const id = req.userData._id
    SignUp.findOne({ _id: id })
        .then(function (me) {
            res.status(200).json({ success: true, me: me })
            console.log(me)
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })
})

router.put('/updateUser', auth.verifyUser, upload.single('profileImage'), function (req, res) {

    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format" })
    }
    const id = req.userData._id;
    const userName = req.body.userName;
    const email = req.body.email;
    const profileImage = req.file.filename;

    SignUp.updateOne({ _id: id }, { userName: userName, email: email, profileImage: profileImage })
        .then(function (result) {
            res.status(200).json({ message: "Updated" })
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })
})

router.put('/user/updateImage/:id', upload.single('profileImage'), function (req, res) {
    const id = req.params.id
    const profileImage = req.file.filename
    SignUp.updateOne({ _id: id }, {
        profileImage: profileImage
    })
        .then(function (result) {
            res.status(200).json({ success: "true", message: "Updated" })

        })
        .catch(function (e) {
            res.status(500).json(e)
        })
})




router.put('/user/update/:id', function (req, res) {
    const uid = req.params.id;
    const name = req.body.name
    const username = req.body.userName
    const email = req.body.email


    SignUp.updateOne({ _id: uid }, {
        $set: {
            name: name, userName: username, email: email
        }
    }
    ).then(function () {

        res.status(200).json({ success: true, message: "Profile updated successfully" })
    })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })
})




module.exports = router
