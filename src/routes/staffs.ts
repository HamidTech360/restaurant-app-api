import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/staff'

const router = Router();

router.get("/", controller.getAllStaffs)
router.post("/", controller.createStaffRecord)


export default router;
