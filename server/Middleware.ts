import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
const secretKey = 'JITESHBANSAL';
import { admin } from "./db.js";


// SERVER LOGS
let NewReq = 0;
export function requests (req: Request, res: Response, next: NextFunction): void {
    NewReq += 1;
    console.log(`${NewReq}. ${req.method} ${req.url} ${new Date()}`);
    next();
}


// MIDDLEWARE ADMIN-AUTH
export async function adminAuth (req: Request, res: Response, next: NextFunction) {
    try {
    const username = req.body.username;
    let password = req.body.password;
    if(username){
        req.headers["user"] = username;
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
        res.status(401).send("error at ADMIN-AUTH Middleware");
    }
}


// MIDDLEWARE VERIFY-TOKEN
export function verifytoken (req: Request, res: Response, next: NextFunction) {
    
    const username = req.body.username;
    let tokenPresent = req.cookies.token;

    if(tokenPresent) {
    jwt.verify(tokenPresent, secretKey, (err: VerifyErrors | null, decoded: any) => {
        if(err){
            res.status(400).send(err.message);
        } else {
        req.headers["user"] = decoded.username;
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
    const token = jwt.sign({username: user}, secretKey, { expiresIn: "0.5h"});
    return token;
}
