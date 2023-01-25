import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/notifications'

const router = Router();

router.post("/", controller.createNotification);
router.get("/",  controller.getAllNotifications)
router.get("/:id",  controller.getSingleNotification)
router.put("/:id",  controller.EditNotification)



export default router;
