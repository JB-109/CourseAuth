import express from "express";
const app = express();
const port = 3000;
import fs from "fs";
import cors from "cors";
import jwt from "jsonwebtoken";
const secretKey = 'JITESHBANSAL';
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
app.use(cookieParser());

const server = app.listen(port, () => {
    console.log(`Server Started at Port ${port}`);
});

let totRequest = 0;
function requests (req, res, next) {
    totRequest += 1;
    console.log(`${totRequest}. ${req.method} ${req.url} ${new Date()}`);
    next();
}
app.use(requests);

async function adminAuth (req, res, next) {
    const {username, password} = req.headers;
    let storedAdmin = await readFile("admin.json");
    let adminCheck = storedAdmin.find(a => a.username == username && a.password == password);
    if(adminCheck){
        next();
    }
    else{
        res.status(401).send("Authorization Failed");
    }
}

app.get("/admin", adminAuth, async (req, res) => {
    let storedAdmin = await readFile("admin.json");
    res.send(storedAdmin);
});

app.post("/admin/signup", async (req, res) => {
    const newAdmin = req.body;
    let storedAdmin = await readFile("admin.json");
    let adminCheck = storedAdmin.find(u => u.username == newAdmin.username && u.password == newAdmin.password);
    if(adminCheck) {
        res.status(401).send("Admin Already Exist");
    }
    else{
        const token = createJWT(newAdmin);
        storedAdmin.push(newAdmin);
        let update = await writeFile("admin.json",JSON.stringify(storedAdmin));
        res.cookie("token", token);
        res.send(update +" "+ token);
    }
});

app.get("/admin/login", adminAuth, (req, res) => {
    res.send("Login Successful");
});

app.post("/admin/add-courses", presentJWT, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    let newCourses = req.body;
    storedCourses.push(newCourses);
    let update = await writeFile("courses.json",JSON.stringify(storedCourses));
    res.send(update);
});

app.put("/admin/update-courses", adminAuth, (req, res) => {
    
});

async function userAuth (req, res, next) {
    let user = req.headers;
    let storedUser = await readFile("users.json");
    let userCheck = storedUser.find(u => u.username == user.username && u.password == user.password);
    if(userCheck) {
        next();
    }
    else{
        res.status(401).send("User does not Exist");
    }
}

app.post("/user/signup", async (req, res) => {
    const newUser = req.body;
    let storedUser = await readFile("users.json");
    let userCheck = storedUser.find(u => u.username == newUser.username && u.password == newUser.password);
    if(userCheck) {
        res.status(401).send("User Already Exist");
    }
    else{
        storedUser.push(newUser);
        let update = await writeFile("users.json",JSON.stringify(storedUser));
        res.send(update);
    }
});

app.get("/user/login", userAuth, (req, res) => {
    res.send("Login Successful");
});

app.get("/user/courses", userAuth, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    res.send(courses.json);
});

function readFile (file) {
    return new Promise ((resolve, reject) => {
        fs.readFile (file,"utf-8", (err, data) => {
            if(err) {
                reject(err);
            }
            else{
                let storedAdmin = JSON.parse(data);
                resolve(storedAdmin);
            }
        });
    });
}

function writeFile (file, data) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if(err) {
                reject(err);
            }
            else{
                resolve("Stored Successfully");
            }
        });
    });
}

function createJWT (user) {
    const token = jwt.sign(user, secretKey, { expiresIn: "1h"});
    return token;
}

function presentJWT (req, res, next) {
    const tokenPresent = req.cookies.token;
    if(!tokenPresent) {
        res.status(401).send("Not Authorized");
    }
        jwt.verify(tokenPresent, secretKey, (err, decoded) => {
            if (err) {
                res.status(403).send(err.message);
            }
            next();
        })   
}