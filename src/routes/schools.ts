import { Router } from "express";
import * as controller from '../controllers/schools'
import { loggedIn } from "../middleware/auth";


const router = Router();

router.post("/", loggedIn, controller.createSchoolRecord);
router.get("/", controller.getAllSchools)
router.get("/search", controller.searchSchool)
router.get("/trash",loggedIn, controller.fetchDeleted)
router.get("/user/:id",loggedIn, controller.getUserUploads)
router.get("/:id", controller.getSingleSchool)
router.delete("/:id",loggedIn, controller.deleteSchool)
router.put("/:id", loggedIn, controller.editSchoolRecord)

export default router;
