import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/analytics'

const router = Router();

router.get("/", controller.getAnalytics)


export default router;
