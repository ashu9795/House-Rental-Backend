import  { Router } from 'express';
import {addFavorite ,removeFavorite , getFavorites} from '../controllers/favorite.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/add-favorite/:propertyId").patch(verifyJWT, addFavorite); // Ensure addFavorite is defined
router.route("/del-favorite/:propertyId").delete(verifyJWT, removeFavorite); // Ensure removeFavorite is defined


router.route("/get-favorites").get(verifyJWT, getFavorites); // Ensure getFavorites is defined

export default router;