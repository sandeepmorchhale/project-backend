const express = require("express")
const multer = require("../middlewares/multer.middileware")
const admincontroller = require("../controllers/admin.controller")

const router = express.Router()

router.post("/product", multer.single("img"), admincontroller.createnewproduct);
router.post("/adduser", multer.single("img"), admincontroller.adduser)
router.get("/contact", admincontroller.allcontacts)


module.exports = router
