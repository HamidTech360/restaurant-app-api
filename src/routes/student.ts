import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/students'

const router = Router();

router.post("/create",loggedIn, controller.createStudentRecord);
router.get("/", loggedIn, controller.getAllStudents)
router.get("/:id", loggedIn, controller.getSingleStudent)
router.put("/:id", loggedIn, controller.updateStudentRecord)



export default router;
