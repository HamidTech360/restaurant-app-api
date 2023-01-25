import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/events'

const router = Router();

router.post("/", controller.createEvent);
router.get("/",  controller.getAllEvents)
router.get("/:id",  controller.getSingleEvent)
router.put("/:id",  controller.EditEvent)



export default router;
