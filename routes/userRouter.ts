import { Router } from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);
router.get("/me", userController.getMe);
router.get("/:id", userController.getUser);
router.post(
  "/update-me",
  userController.parseFormData,
  userController.resizeUserPhoto,
  userController.updateMe
);
export default router;
