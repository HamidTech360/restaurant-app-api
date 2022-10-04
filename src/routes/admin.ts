import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/admin'

const router = Router();


router.get("/", loggedIn, controller.getAllAdmins)
router.get("/:id", loggedIn, controller.GetAdmin)
router.post("/", loggedIn, controller.verifyAdmin)
router.put("/", loggedIn, controller.editAdmin)

export default router;
