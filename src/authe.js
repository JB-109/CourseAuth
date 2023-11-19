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

// SERVER
const server = app.listen(port, () => {
    console.log(`Server Started at Port ${port}`);
});

// SERVER LOGS
let totRequest = 0;
function requests (req, res, next) {
    totRequest += 1;
    console.log(`${totRequest}. ${req.method} ${req.url} ${new Date()}`);
    next();
}
app.use(requests);

// ADMIN END-POINT
app.get("/admin", adminAuth, async (req, res) => {
    let storedAdmin = await readFile("admin.json");
    res.send(storedAdmin);
});

// ADMIN SIGN-UP END-POINT
app.post("/admin/signup", async (req, res) => {
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

// MIDDLEWARE ADMIN-AUTH
async function adminAuth (req, res, next) {
    try {
    const username = req.body.username;
    let password = req.body.password;
    if(username){
    req.user = {username: username};
    let storedAdmin = await readFile("admin.json");
    let adminCheck = storedAdmin.find(a => a.username == username && a.password == password);
    if(adminCheck){
        next();
    }
    else{
        res.status(401).send("Authorization Failed");
    }
    } else {
    next();
    }
    } catch (error) {
        console.error(error.message);
        res.status(401).send("error at ADMIN-AUTH");
    }
}

// MIDDLEWARE VERIFY-TOKEN
function verifytoken (req, res, next) {
    
    const username = req.body.username;
    let tokenPresent = req.cookies.token;

    if(tokenPresent) {
    jwt.verify(tokenPresent, secretKey, (err, decoded) => {
        if(err){
            res.status(400).send(err.message);
        } else {
        req.user = decoded;
        next();
        }
    })
    } else 
    if(!username) {
        res.status(401).send("Input Username");
    }
    else {
        next();
    }
} 

// MIDDLEWARE CHECKEXISTENCE
function checkExistence (req, res, next) {
    let tokenPresent = req.cookies.token;
    
    if(!tokenPresent){
        let newAdmin = req.body;
        let token = createJWT(newAdmin);
        res.cookie("token", token);
        next();
    }
    else {
        next();
    }
}

// ADMIN LOGIN END-POINT
app.post("/admin/login", adminAuth, verifytoken, checkExistence, (req, res) => {
   res.status(201).send("Login Successful");
});

// END-POINT FOR STATE VARIABLE AT CLIENT SIDE
app.get("/me", adminAuth, verifytoken, checkExistence, (req, res) => {
    res.json({username: req.user.username});
});

// ADMIN ADD-COURSE END-POINT
app.post("/admin/add-courses", verifytoken, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    let newCourses = req.body;
    storedCourses.push(newCourses);
    let update = await writeFile("courses.json",JSON.stringify(storedCourses));
    res.send(update);
});

// GET COURSES END-POINT
app.get("/courses", verifytoken, async (req, res) => {
    let storedCourses = await readFile("courses.json");
    res.send(JSON.stringify(storedCourses));
});

// ASYNC READFILE FUNCTION
function readFile (file) {
    return new Promise ((resolve, reject) => {
        fs.readFile (file,"utf-8", (err, data) => {
            if(err) {
                reject(err.message);
            }
            else{
                let storedAdmin = JSON.parse(data);
                resolve(storedAdmin);
            }
        });
    });
}

// ASYNC WRITEFILE FUNCTION
function writeFile (file, data) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if(err){
                reject(err.message);
            }
            resolve("Stored Successfully");
        });
    });
}

// FUNCTION FOR CREATING JWT TOKENS
function createJWT (user) {
    const token = jwt.sign(user, secretKey, { expiresIn: "1h"});
    return token;
}



// app.put("/admin/update-courses", adminAuth, (req, res) => {
    
// });

// async function userAuth (req, res, next) {
//     let user = req.headers;
//     let storedUser = await readFile("users.json");
//     let userCheck = storedUser.find(u => u.username == user.username && u.password == user.password);
//     if(userCheck) {
//         next();
//     }
//     else{
//         res.status(401).send("User does not Exist");
//     }
// }

// app.post("/user/signup", async (req, res) => {
//     const newUser = req.body;
//     let storedUser = await readFile("users.json");
//     let userCheck = storedUser.find(u => u.username == newUser.username && u.password == newUser.password);
//     if(userCheck) {
//         res.status(401).send("User Already Exist");
//     }
//     else{
//         storedUser.push(newUser);
//         let update = await writeFile("users.json",JSON.stringify(storedUser));
//         res.send(update);
//     }
// });

// app.get("/user/login", userAuth, (req, res) => {
//     res.send("Login Successful");
// });
