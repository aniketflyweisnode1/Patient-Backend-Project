const OTP = require("../config/OTP-Token");
const User = require("../models/userModel");

const SignUpUser = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json("mobile is required");
    }

    const findUser = await User.findOne({ mobile });
    if (findUser) {
      return res.status(409).json("mobile already in use");
    }

    const otp = OTP.generateOTP();
    const newUser = await User.create({ mobile, otp });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User are not found" });
    }

    if (user.otp != req.body.otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    const token = OTP.generateJwtToken(user._id);
    return res.status(200).json({
      message: "OTP Verify Successfully",
      token:token
    })
     
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

const resendOTP = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    const otp = OTP.generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { otp, otpExpiration, },
      { new: true }
    );
    let obj = {
      id: updated._id,
      otp: updated.otp,
      mobile: updated.mobile,
    };
    res.status(200).send({ status: 200, message: "OTP resent", data: obj });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

module.exports = {
  SignUpUser,
  verifyOTP,
  resendOTP,
};
