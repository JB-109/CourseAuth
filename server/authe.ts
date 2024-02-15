import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import cookieParser from "cookie-parser";
import endPoints from "./EndPoints.js";
import userEndPoints from "./userEndPoints.js"
import { requests } from "./Middleware.js";

app.use(express.json());
app.use(cookieParser());
app.use(requests);
app.use(cors({ credentials: true, origin: "http://localhost:5173", maxAge: 86400}));

// SERVER
const server = app.listen(port, () => {
    console.log(`Server Started at Port ${port}`);
});

// END-POINTS
app.use("/admin", endPoints);

// END-POINTS
app.use("/user", userEndPoints);