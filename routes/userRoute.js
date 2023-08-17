const router = require("express").Router();
const { SignUpUser, verifyOTP, resendOTP } = require("../controller/userCtrl");

router.post("/signup", SignUpUser);
router.post("/verify/otp/:id", verifyOTP);
router.post("/resend/otp/:id", resendOTP);

module.exports = router;
