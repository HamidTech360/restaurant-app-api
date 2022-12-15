import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/result'

const router = Router();

router.post("/", controller.uploadResult);
router.put("/:id", controller.EditResult)


export default router;
