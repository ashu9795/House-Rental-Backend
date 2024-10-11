import { Router } from "express";
import { addProperty,updateProperty,updatePropertyPicture,getPropertyBYId, getProperty,deleteProperty } from "../controllers/property.controller.js";
import {verifyJWT}  from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/add-property").post(verifyJWT,upload.single("image") ,addProperty);   //todo add verifyJWT middleware
router.route("/update-property/:propID").put(verifyJWT,updateProperty);   //todo add verifyJWT middleware

router.route("/update-property-picture/:propID").put(verifyJWT,upload.single("image"),updatePropertyPicture);   //todo add verifyJWT middleware
router.route("/get-propertyId/:propID").get(getPropertyBYId);   //todo add verifyJWT middleware
router.route("/get-property").get(getProperty);   //todo  reove it aftter checking
router.route("/delete-property/:propID").delete(verifyJWT,deleteProperty);   //todo add verifyJWT middleware
export default router;
