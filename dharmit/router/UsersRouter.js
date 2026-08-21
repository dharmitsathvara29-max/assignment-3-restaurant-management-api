const express = require('express');
const User = require("../models/user");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/", (request, response) => {
    try {
        response.status(200).send("welcome to rest");
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});
router.post('/register', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name) {
            return response.status(400).json({
                message: "Name is required"
            });
        }
        if (!email) {
            return response.status(400).json({
                message: "Email is required"
            });
        }
        if (!password) {
            return response.status(400).json({
                message: "Password is required"
            });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return response.status(400).json({
                message: "Email already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);


        const newUser = {
            name: name,
            email: email,
            password: hashPassword
        };


        const user = new User(newUser);

        await user.save();


        response.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {

        response.status(500).json({
            message: error.message
        });

    }

});


router.post('/login', async (request, response) => {
    try {
        const { name, password } = request.body;
        if (!name) {
            return response.status(400).json({
                message: "Name is required"
            });
        }
        if (!password) {
            return response.status(400).json({
                message: "Password is required"
            });
        }
        const user = await User.findOne({ name });
        if (!user) {
            return response.status(400).json({
                message: "Invalid user or password"
            });
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return response.status(400).json({
                message: "Invalid user or password"
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            "key",
            {
                expiresIn: "1h"
            }
        );

        response.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (error) {

        response.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;