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
