import { Router } from "express";

import {applyFilter} from "../controllers/filter.controller.js";


const router = Router();


router.route("/apply-filter").get( applyFilter);

export default router;