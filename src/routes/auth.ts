import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/auth'

const router = Router();

router.post("/", controller.login);


export default router;
