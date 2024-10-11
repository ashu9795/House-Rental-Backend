import { Router } from "express";
import  { createTranscation, getTranscation, updateStatus, cancelTranscation } from "../controllers/transcation.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/creat-transaction/:popertyID").post(verifyJWT, createTranscation);
router.route("/get-transaction").get(verifyJWT, getTranscation);
router.route("/update-status/:transcationID").patch(verifyJWT, updateStatus);
router.route("/cancel-transaction/:transcationID").patch(verifyJWT, cancelTranscation);


export default router;
