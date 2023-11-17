const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

app.use(express.json());

counter = 0;
function middle (req, res, next) {
    counter += 1;
    console.log(`${counter}. ${req.method} ${req.url} ${new Date()}`);
    next();
}
app.use(middle);

const server = app.listen(port, ()=> {
    console.log(`Server started running at ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/todo", (req, res) => {
        readFile().then((savedTodo) => {
            res.send(savedTodo);
        });
    }
)

let counter1 = 0;
app.post("/todo", (req, res) => {
    counter1 += 1;
    let todo = {
        serial: counter1,
        title: req.body.title,
        des: req.body.des
    }
    readFile().then((storedtodo) => {
        let todoNew = storedtodo;
        todoNew.push(todo);
    writeFile(JSON.stringify(todoNew)).then((update) => {
        res.send(update);}).catch((err) => {
            res.status(401).send(err);
        });
    });
});

app.delete("/todo/:title", (req, res) => {
    readFile().then((storedTodo) => {
        let todo = storedTodo;
     let reqTitle = parseInt(req.params.title);
     let index = findIndex(todo, reqTitle);
     if(index===-1){
        res.status(401).send("Todo not Found.")
     }
     else{
       let afterDelTodo = deleteIndex(todo, index);
       writeFile(JSON.stringify(afterDelTodo)).then((update) => {
        res.send("Deleted Successfully");
       }).catch((err) => {
        res.status(401).send(err);
       });
     }
    });
});

function readFile() {
    return new Promise((resolve, reject) => {
    fs.readFile("todo.json","utf-8",(err, data) => {
        if (err) {
            reject(err);
        }
        else{
            let todo = JSON.parse(data);
            resolve(todo);
        }
    });
});
}

function writeFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("todo.json", data, (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Saved Successfully");
            }
        });
    });
}

function findIndex(arr, title) {
    for(i=0;i<arr.length;i++) {
        if(arr[i].title==title) return i;
    }
    return -1;
}

function deleteIndex(arr, index) {
    let todo = [];
    for(i=0;i<arr.length;i++) {
        if(i!=index) todo.push(arr[i]);
    }
    return todo;
}