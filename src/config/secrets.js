require("dotenv").config();

const secrets = {
  jwtSecret: process.env.JWT_SECRET,
  jwtRegisterSecret: process.env.JWT_REGISTER_SECRET,
  jwtResetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET
};

export default secrets;
