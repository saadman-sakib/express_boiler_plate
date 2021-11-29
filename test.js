const { Sequelize } = require("sequelize");

// create application/json parser
var jsonParser = bodyParser.json()

//sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/temp.sqlite",
});

const User = sequelize.define("task", {
    name: Sequelize.STRING,
    date: Sequelize.STRING,
});

// Create User Table
User.sync({force:true});
// console.log("The table for the User model was just (re)created!");

create_user = async () => {
    await sequelize.sync();
    await User.create({
        name: "John Doe",
        email: "john@gmail.com",
    });
};

create_user();

// query
User.findAll().then((users) => {
    console.log(users);
});