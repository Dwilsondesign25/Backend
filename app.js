import express from "express";
import fs from "fs";
import { resolve } from "path";


// const express = require("express");

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
        res.send("Hello Angular Devs!");
    })
    .get("/user/users", getUsers)
    .get("/user/usersSingle/:userId", getSingleUser)
    .get("/user/userSearch/:searchText", getUserSearch)
    .post("/user/addUser", addNewUser)

    console.log("test")

app.listen(3000,() => {
    console.log("Server is running on http://localhost.3000");
})

function getUsers(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        // console.log(results);
        let userList = JSON.parse(results);
        res.send(userList);
    })
}

function getSingleUser(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let userId = +req.params.userId;
        // "6"
        // 6
        // console.log(results);
        let userList = JSON.parse(results);
        
        let singleUser = userList.filter(row => {
            return row.userId === userId;
        })[0]
        res.send(singleUser);
    })
}

function getUserSearch(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        let searchText = req.params.searchText.toLowerCase();
        
        let userList = JSON.parse(results);
        
        let searchedUsers = userList.filter(row => {
            return row.fullName.toLowerCase().includes(searchText);
        })

        res.send(searchedUsers);
    })
}


function editUser(req, res) {
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        
        let userList = JSON.parse(results);
        
        let userForEdit = req.body;

        let userID = userForEdit.userId;

        //Set the userId
        userList.sort((a, b) => {
            return a.userId > b.userId ? 1 : -1; 
        })

        userList.push(newUser);

        let userListText = JSON.stringify(userList);

        writeToFile("users.json", userListText).then(didWriteToFile => {
           if (didWriteToFile) {
            res.send({"Message": "User added successfully"});
           } else {
            res.send({"message": "Request Failed To Save"});
           }
        })
    })
}

function writeToFile(fileName, fileText) {
    return new Promise((resolve) => {
    fs.writeFile(fileName, fileText, (err) => {
        if (err) {
            console.log(err);
            // resolve(err);
            resolve(false);
            } else {
                // resolve(fileText);
                resolve(true);
            }
        })
    })
}