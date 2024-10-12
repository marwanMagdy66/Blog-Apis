import { Router } from "express";
import * as interactionController from "./interaction.controller.js";
import * as interactionSchema from "./interaction.schema.js";
import { isAuth } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";

const router = Router();

router.post(
  "/create-React",
  isAuth,
  validation(interactionSchema.createReact),
  interactionController.createReact
);


router.patch(
    "/update-React/:id",
    isAuth,
    validation(interactionSchema.updateReact),
    interactionController.updateReact
  );
  
  router.delete(
    "/delete-React/:id",
    isAuth,
    validation(interactionSchema.deleteReact),
    interactionController.deleteReact
  );
export default router;
