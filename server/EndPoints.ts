import express from "express";
import { adminAuth, verifytoken, checkExistence } from "./Middleware.js";
import { admin, courses } from "./db.js";

const router = express.Router();

// ADMIN END-POINT
router.get("/", adminAuth, async (req, res) => {
    try {
    const getStoredAdmin = await admin.find().exec();
    res.send(getStoredAdmin);
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
    let storedAdmin = await admin.findOne({username});
    if(storedAdmin) {
        res.status(409).send("Admin Already Exist");
    }
    else{
        const newAdmin = new admin({username: username, password: password});
        await newAdmin.save();
        res.status(201).send("Welcome " + username);
    }
    } catch (error) {
        console.error((error as Error).message);
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
    const newCourse = new courses({title: req.body.title, description: req.body.description});
    await newCourse.save();
    res.status(201).send("Course Added Successfully");
});



// GET COURSES END-POINT
router.get("/courses", verifytoken, async (req, res) => {
    try {
    const getStoredCourses = await courses.find().exec();
    res.status(201).send(getStoredCourses);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Internal Serevre Error at VERIFY-TOKEN");
    }
});

export default router;