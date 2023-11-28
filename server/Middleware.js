import jwt from "jsonwebtoken";
const secretKey = 'JITESHBANSAL';
import { admin } from "./db.js";


// MIDDLEWARE ADMIN-AUTH
export async function adminAuth (req, res, next) {
    try {
    const username = req.body.username;
    let password = req.body.password;
    if(username){
    req.user = {username: username};
    const storedAdmin = await admin.findOne({username, password});
    if(storedAdmin){
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
export function verifytoken (req, res, next) {
    
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
export function checkExistence (req, res, next) {
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


// FUNCTION FOR CREATING JWT TOKENS
export function createJWT (user) {
    const token = jwt.sign(user, secretKey, { expiresIn: "1h"});
    return token;
}
