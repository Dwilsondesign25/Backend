import express from "express";
import fs from "fs";


// const express = require("express");

const app = express();

app.get("/",(req, res) => {
        res.send("Hello Angular Devs!");
    })
    .get("/users", getUsers)

console.log("test")

app.listen(3000,() => {
    console.log("Server is running on http://localhost.3000");
})

function getUsers(req, res){
    fs.readFile("users.json", { encoding: "utf-8" }, (err, results) => {
        // console.log(results);
        let userList = JSON.parse(results);
        res.send(userList);
    })
}