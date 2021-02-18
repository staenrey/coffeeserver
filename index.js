const express = require("express")
const crypto = require("crypto")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

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
    res.render("pages/schedules", {schedules: data.schedules, users: data.users, weekDays: utils.weekDays})
})

//most specific route should go first

app.get("/new", (req, res) => {
    res.render("pages/addschedule", {users: data.users})
})

app.post("/new", (req, res) => {
    const newSchedule = req.body
    newSchedule.user_id = parseInt(newSchedule.user_id, 10)
    newSchedule.day = parseInt(newSchedule.day, 10)
    data.schedules.push(newSchedule)
    res.redirect("/")
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