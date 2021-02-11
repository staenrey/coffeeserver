const express = require("express")
const crypto = require("crypto")

const data = require("./data.js")


const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send("Welcome to our schedule website")
})

app.get("/users", (req, res) => {
    res.send(data.users)
})

app.get("/schedules", (req, res) => {
    res.send(data.schedules)
})

app.get("/users/:userId", (req, res) => {
    res.send(data.users[req.params.userId])
})

app.get("/users/:userId/schedules", (req, res) => {
    const userSchedules = [];
    for (i = 0; i < data.schedules.length; i++) {
        if (data.schedules[i].user_id === parseInt(req.params.userId, 10)) {
            userSchedules.push(data.schedules[i])
        }
    }
    res.send(userSchedules)
})

app.post("/schedules", (req, res) => {
    const newSchedule = req.body
    newSchedule.user_id = parseInt(newSchedule.user_id, 10)
    newSchedule.day = parseInt(newSchedule.day, 10)
    data.schedules.push(newSchedule)
    res.send(newSchedule)
})

app.post("/users", (req, res) => {
    
    const password = req.body['password']
    const hash = crypto.createHash("sha256").update(password).digest("base64")
    req.body.password = hash
    data.users.push(req.body)
    res.send(data.users[data.users.length - 1])
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