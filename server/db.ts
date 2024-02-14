import mongoose from "mongoose";


const uri = "mongodb+srv://JB109:Konibero99@ed.gihi7db.mongodb.net/";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String
});

// Schema for Admin
export const admin = mongoose.model("admin", adminSchema);

// Schema for Courses
export const courses = mongoose.model("courses", courseSchema);

mongoose.connect(uri);







// // ASYNC READFILE FUNCTION
// export function readFile (file) {
//     return new Promise ((resolve, reject) => {
//         fs.readFile (file,"utf-8", (err, data) => {
//             if(err) {
//                 reject(err.message);
//             }
//             else{
//                 let storedAdmin = JSON.parse(data);
//                 resolve(storedAdmin);
//             }
//         });
//     });
// }

// // ASYNC WRITEFILE FUNCTION
// export function writeFile (file, data) {
//     return new Promise ((resolve, reject) => {
//         fs.writeFile(file, data, (err) => {
//             if(err){
//                 reject(err.message);
//             }
//             resolve("Stored Successfully");
//         });
//     });
// }

