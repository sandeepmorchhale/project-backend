require("dotenv").config()
const app = require("./src/app")
const mongodb = require("./src/db/db")
mongodb()


// CaT6q1EW8BFAkw03



app.listen(5000, () => {
    console.log("server started")
})

