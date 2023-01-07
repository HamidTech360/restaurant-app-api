import { Router } from "express";
import { loggedIn } from "../middleware/auth";
import * as controller from '../controllers/result'

const router = Router();

router.post("/",loggedIn, controller.uploadResult);
router.put("/:id",loggedIn, controller.EditResult)
router.get("/one/:id", controller.getSingleResult)
router.get("/:id",controller.getStudentResults )


export default router;
