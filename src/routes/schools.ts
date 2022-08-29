import { Router } from "express";
import * as controller from '../controllers/schools'


const router = Router();

router.post("/", controller.createSchoolRecord);
router.get("/", controller.getAllSchools)
router.get("/:id", controller.getSingleSchool)
router.delete("/:id", controller.deleteSchool)

export default router;
