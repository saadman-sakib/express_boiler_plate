const { Sequelize } = require("sequelize");
const express = require("express");
const nunjucks = require("nunjucks");
var bodyParser = require('body-parser')

const app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// create application/x-www-form-urlencoded parser (form data parser)
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/temp.sqlite",
});

const Task = sequelize.define("task", {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    date: Sequelize.STRING,
});

// Create User Table
Task.sync({ force: false });
// console.log("The table for the User model was just (re)created!");




//routes
app.get("/", (req, res) => {
    //query the database
    Task.findAll().then(tasks => {
        //reverse tasks
        tasks.reverse();
        res.render("home.html", { tasks });
    });
});

app.post("/create_task", urlencodedParser, async (req, res) => {
    var task = req.body;
    const newTask = await Task.create({
        title: task.title,
        description: task.description,
        date: task.date,
    });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});