import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as authSchema from "./auth.schema.js";
import { validation } from "../../middleware/validation.js";

const router = Router();

router.post("/register",validation(authSchema.register),authController.register);
router.get("/activate_account/:token",validation(authSchema.activate),authController.activate)
router.post("/login",validation(authSchema.login),authController.login)

export default router;
