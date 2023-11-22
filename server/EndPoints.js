import express from "express";
import { adminAuth, verifytoken, checkExistence, createJWT } from "./Middleware.js";
import { readFile, writeFile } from "./db.js";

const router = express.Router();

// ADMIN END-POINT
router.get("/", adminAuth, async (req, res) => {
    let storedAdmin = await readFile("admin.json");
    res.send(storedAdmin);
});


// ADMIN SIGN-UP END-POINT
router.post("/signup", async (req, res) => {
    try {
    let newAdmin = req.body;
    let storedAdmin = await readFile("admin.json");
    let adminCheck = storedAdmin.find(u => u.username == newAdmin.username && u.password == newAdmin.password);
    if(adminCheck) {
        res.status(409).send("Admin Already Exist");
    }
    else{
        storedAdmin.push(newAdmin);
        let update = await writeFile("admin.json",JSON.stringify(storedAdmin));
        res.status(201).send(update);
    }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("error at ADMIN-SIGNUP");
    }
});


// ADMIN LOGIN END-POINT
router.post("/login", adminAuth, verifytoken, checkExistence, (req, res) => {
    res.status(201).send("Login Successful");
    console.log("Login Successful");
});


// END-POINT FOR STATE VARIABLE AT CLIENT SIDE
router.get("/me", adminAuth, verifytoken, checkExistence, (req, res) => {
    res.json({username: req.user.username});
});


// ADMIN ADD-COURSE END-POINT
router.post("/add-courses", verifytoken, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    let newCourses = req.body;
    storedCourses.push(newCourses);
    let update = await writeFile("courses.json",JSON.stringify(storedCourses));
    res.send(update);
});


// GET COURSES END-POINT
router.get("/courses", verifytoken, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    res.send(JSON.stringify(storedCourses));
});

export default router;