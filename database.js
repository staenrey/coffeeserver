// my database for the project

const pgp = require("pg-promise")() // require('pg-promise') returns a function that we immediately call, and store the result in a pgp var

const connection = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'coffeeserver',
    user: 'staenrey',
    password: '12345'
};// database connection object, we store in a variable 'connection' the info

const db = pgp(connection) // var db equals to a result of a function pgp that processed a connection var

module.exports = db // says that when in a file (in our case, index.js) we say require("./database"), we get db as a result

// INSERT INTO schedules(username, day_of_week, start_time, end_time) VALUES ('staenreytest', 1, '00:00:00', '00:00:01');

// SELECT * from schedules;