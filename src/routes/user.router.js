// src/routes/user.router.js
import { Router } from "express";
import { registerUser,userProfile , login , userUpdate, logout , changePassword } from "../controllers/user.controller.js"; // Correct import
import {verifyJWT}  from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser); // Ensure registerUser is defined
router.route("/profile").get(verifyJWT, userProfile); // Ensure userProfile is defined
router.route("/login").post(login); // Ensure login is defined
router.route("/update").put(verifyJWT, userUpdate); // Ensure userUpdate is defined
router.route("/logout").get(verifyJWT, logout); // Ensure logout is 
router.route("/change-password").put(verifyJWT, changePassword); // Ensure changePassword is defined



export default router;
