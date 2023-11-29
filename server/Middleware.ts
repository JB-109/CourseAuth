import jwt, { VerifyErrors } from "jsonwebtoken";

const secretKey = 'JITESHBANSAL';
import { admin } from "./db.js";
import { NextFunction, Request, Response } from "express";

// MIDDLEWARE ADMIN-AUTH
export async function adminAuth (req: Request, res: Response, next: NextFunction) {
    try {
    const username = req.body.username;
    let password = req.body.password;
    if(username){
    req.headers["user"] = username;
    console.log(username + " hi")
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
        console.error((error as Error).message);
        res.status(401).send("error at ADMIN-AUTH");
    }
}


// MIDDLEWARE VERIFY-TOKEN
export function verifytoken (req: Request, res: Response, next: NextFunction) {
    
    const username = req.body.username;
    let tokenPresent = req.cookies.token;

    if(tokenPresent) {
    jwt.verify(tokenPresent, secretKey, (err: VerifyErrors | null, decoded: object | string | undefined) => {
        if(err){
            res.status(400).send(err.message);
        } else {
        req.headers["user"] = username;
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
export function checkExistence (req: Request, res: Response, next: NextFunction) {
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
export function createJWT (user: string) {
    const token = jwt.sign(user, secretKey, { expiresIn: "0.5h"});
    return token;
}
