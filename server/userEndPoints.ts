import express from "express";
import { adminAuth, verifytoken, checkExistence, createJWT } from "./Middleware";
import * as db from "./db";
import { z } from "zod";

const router = express.Router();

router.get("/", adminAuth, async (req, res) => {

});

export default router;