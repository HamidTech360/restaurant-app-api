import { Router } from "express";

import * as controller from '../controllers/restaurant.controller'
import { getTags } from "../controllers/tag.controller";

const router = Router();


router.post("/", controller.createRestaurant);
router.get("/", controller.getRestaurants)
router.get("/search", controller.searchRestaurant)
router.get("/tags", getTags)



export default router;
