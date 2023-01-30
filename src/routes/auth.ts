import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/auth'

const router = Router();

router.post("/login", controller.login);
router.post("/create", controller.CreateAccount);
router.get("/test", controller.testAuth)
router.put("/", loggedIn, controller.editAccount)


export default router;
