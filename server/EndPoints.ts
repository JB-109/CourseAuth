import express from "express";
import { adminAuth, verifytoken, checkExistence } from "./Middleware.js";
import * as db from "./db.js";
import { createJWT } from "./Middleware.js";

const router = express.Router();

// ADMIN END-POINT
router.get("/", adminAuth, async (req, res) => {
    
    try {
    const getStoredAdmin = await db.admin.find();
    res.status(200).send(getStoredAdmin);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Internal Server Error at ADMIN-AUTH");
    }
});


// ADMIN SIGN-UP END-POINT
router.post("/signup", async (req, res) => {
    
    try {
    let username = req.body.username;
    let password = req.body.password;
    let storedAdmin = await db.admin.findOne({username});
    if(storedAdmin) {
        res.status(409).send(`${username} not Available`);
    }
    else{
        const newAdmin = new db.admin({username: username, password: password});
        await newAdmin.save();
        try {
        let token = createJWT(username);
        res.cookie("token", token);
        console.log(token);
        } catch (err) {
            console.error((err as Error).message);
        }
        res.status(201).send(`Welcome ${username}`);
    }
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("error at ADMIN-SIGNUP");
    }
});


// ADMIN LOGIN END-POINT
router.post("/login", adminAuth, verifytoken, checkExistence, (req, res) => {
    res.status(201).send("Login Successful");
});


// END-POINT FOR STATE VARIABLE AT CLIENT SIDE
router.get("/me", adminAuth, verifytoken, checkExistence, (req, res) => {
    const username = req.headers["user"];
    res.status(200).send({username: username});
});


// ADMIN ADD-COURSE END-POINT
router.post("/add-courses", verifytoken, async (req, res) => {
    const newCourse = new db.courses({title: req.body.title, description: req.body.description});
    await newCourse.save();
    res.status(201).send("Course Added Successfully");
});



// GET COURSES END-POINT
router.get("/courses", verifytoken, async (req, res) => {
    try {
    const getStoredCourses = await db.courses.find().exec();
    res.status(201).send(getStoredCourses);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Internal Serevre Error at VERIFY-TOKEN");
    }
});

export default router;