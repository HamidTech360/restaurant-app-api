import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/auth'

const router = Router();

router.post("/", controller.login);
router.post("/register", controller.registerAdmin)
router.get("/admin", loggedIn, controller.getAdmin)

export default router;
