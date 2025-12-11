const express = require("express")
const usercontroller = require("../controllers/user.controller")

const router = express.Router()

router.post("/contact", usercontroller.submitContact)
router.get("/product",usercontroller.allproducts)
router.get("/clintes",usercontroller.allusers)

module.exports = router