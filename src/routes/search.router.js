import { Router } from "express";


import { searchProperty ,savedSearch, searchResult } from "../controllers/search.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/search-property").post (searchProperty); 
router.route("/saved-search").post(verifyJWT, savedSearch);
router.route("/search-result").get(verifyJWT, searchResult);


export default router;