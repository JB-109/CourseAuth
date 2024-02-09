import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
const secretKey = 'JITESHBANSAL';
import * as db from "./db.js";


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
        let username = req.body.username;
        let password =  req.body.password;

    if(username){
        let storedAdmin = await db.admin.findOne({username: username, password: password});
        if(storedAdmin){
            next();
        } else {
            res.status(401).send("Authorization Failed");
        }
    } else {
        next();
    }
    } catch (err) {
        console.error((err as Error).message);
        res.status(401).send("Error at AdminAuth");
    }
}


// MIDDLEWARE VERIFY-TOKEN
export function verifytoken (req: Request, res: Response, next: NextFunction) {
    
    try {
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
    } else if(!username) {
        res.status(401).send("Input Username");
    }
    else {
        next();
    }
    } catch (err) {
        console.error((err as Error).message);
        res.status(401).send("Error at VerifyToken")
    }
} 


// MIDDLEWARE CHECKEXISTENCE
export function checkExistence (req: Request, res: Response, next: NextFunction) {

    try {
        let tokenPresent = req.cookies.token;
    
    if(!tokenPresent){
        let newAdmin = req.body.username;
        let token = createJWT(newAdmin);
        res.cookie("token", token);
        next();
    }
    else {
        next();
    }
    } catch (err) {
        console.error((err as Error).message);
        res.status(401).send("Error at CheckExistence");
    }
}


// FUNCTION FOR CREATING JWT TOKENS
export function createJWT (user: string) {

    try {
    const payload = {username: user};
    const token = jwt.sign(payload, secretKey, { expiresIn: "0.5h"});
    return token;
    } catch (err) {
        console.error((err as Error).message);
    }
}
