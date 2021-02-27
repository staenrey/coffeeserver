const express = require("express")
const crypto = require("crypto")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

const database = require('./database')
const data = require("./data.js")
const utils = require("./utils.js")


const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true })) // for parsing app/x-www-form-urlencoded
app.use("/static", express.static(path.join(__dirname, "public")))
app.use(expressLayouts)

app.set("layout", "pages/layouts/basiclayout")
app.set("view engine", "ejs")


app.get("/", (req, res) => {
    database.any("SELECT * FROM schedules;")
        .then((schedules_array) => {
            res.render("pages/schedules", {schedules: schedules_array, weekDays: utils.weekDays})
        })
        .catch(error => {
            res.send(error)
        })
})

app.get("/new", (req, res) => {
    res.render("pages/addschedule", {users: data.users})
})

app.post("/new", (req, res) => {
    const newSchedule = req.body
   
    newSchedule.day_of_week = parseInt(newSchedule.day_of_week, 10)

    database.none('INSERT INTO schedules(username, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4)', [newSchedule.username, newSchedule.day_of_week, newSchedule.start_time, newSchedule.end_time])
        .then(() => {
            res.redirect("/")
        })
        .catch(error => {
            res.send(error)
        })

})

app.listen(port, () => {
    console.log(`Coffeeserver listening at http://localhost:${port}`)
})



// function double(a) {
//     return a+a;
// }

// const double = function(a){ return a+a }

// function doAndPrint(a, f){
//     const result = f(a);
//     console.log(result);
// }

// doAndPrint(4, double)
// doAndPrint(4, function(a){ return a+a })
// doAndPrint(4, (a) => a+a )

// math = {
//     pi: 3.14,
//     e: 2.71,
//     name: "Pifagor",
//     double: function(a){ return a+a },
//     corners: ["A", "B", "C"]
// }

// math["pi"] // -> 3.14
// math.pi  //   -> 3.14
// math.double(2)  // -> 4