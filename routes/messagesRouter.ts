import { Router } from "express";
import * as messageController from "../controllers/messageController";
import { protect } from "../controllers/authController";

const router = Router();

router.use(protect);
router.route("/chat/:userId").get(messageController.getChat);
router.route("/group/:groupId").get(messageController.getGroupChat);

export default router;
