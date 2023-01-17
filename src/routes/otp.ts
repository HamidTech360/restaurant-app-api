import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/otp'

const router = Router();

router.get("/", controller.getOTP)
router.post("/", controller.verifyOTP)


export default router;
