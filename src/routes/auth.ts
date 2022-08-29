import { Router } from "express";
import * as controller from '../controllers/auth'

const router = Router();

router.post("/", controller.login);
router.post("/register", controller.registerAdmin)

export default router;
