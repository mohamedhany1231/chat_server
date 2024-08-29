import { Router } from "express";
import * as contactsController from "../controllers/contactsController";
import * as authController from "../controllers/authController";

const router = Router();

router.use(authController.protect);

router
  .route("/my-contacts")
  .post(contactsController.addContact)
  .get(contactsController.getMyContacts);

export default router;
