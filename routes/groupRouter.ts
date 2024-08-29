import { Router } from "express";
import * as groupController from "../controllers/groupController";
import { protect } from "../controllers/authController";
const router = Router();

router.use(protect);
router.route("/").post(groupController.createGroup);
router.route("/add-user").post(groupController.addUserToGroup);
router.route("/remove-user").post(groupController.removeUserFromGroup);
router.route("/:groupId").get(groupController.getGroupData);

export default router;
