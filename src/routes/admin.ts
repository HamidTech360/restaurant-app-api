import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/admin'

const router = Router();


router.get("/", loggedIn, controller.getAllAdmins)
router.post("/", loggedIn, controller.verifyAdmin)

export default router;
