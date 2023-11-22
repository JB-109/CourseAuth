import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import cookieParser from "cookie-parser";
import endPoints from "../server/EndPoints.js";

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

app.use("/admin", endPoints);

