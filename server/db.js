import fs from "fs";

// ASYNC READFILE FUNCTION
export function readFile (file) {
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
export function writeFile (file, data) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if(err){
                reject(err.message);
            }
            resolve("Stored Successfully");
        });
    });
}

