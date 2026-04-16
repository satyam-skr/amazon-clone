import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { createOrderController, getOrderController } from "./controller";
import {
  createOrderSchema,
  guestIdHeaderSchema,
  orderIdParamSchema,
} from "./schema";

const router = Router();

router.post(
  "/",
  validate(guestIdHeaderSchema, "headers"),
  validate(createOrderSchema, "body"),
  createOrderController
);
router.get(
  "/:id",
  validate(guestIdHeaderSchema, "headers"),
  validate(orderIdParamSchema, "params"),
  getOrderController
);

export default router;
