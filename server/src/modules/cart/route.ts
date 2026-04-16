import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import {
  addToCartController,
  getCartController,
  removeFromCartController,
  updateCartItemController,
} from "./controller";
import {
  addCartItemSchema,
  guestIdHeaderSchema,
  removeCartItemSchema,
  updateCartItemSchema,
} from "./schema";

const router = Router();

router.get("/", validate(guestIdHeaderSchema, "headers"), getCartController);
router.post(
  "/add",
  validate(guestIdHeaderSchema, "headers"),
  validate(addCartItemSchema, "body"),
  addToCartController
);
router.patch(
  "/update",
  validate(guestIdHeaderSchema, "headers"),
  validate(updateCartItemSchema, "body"),
  updateCartItemController
);
router.delete(
  "/remove",
  validate(guestIdHeaderSchema, "headers"),
  validate(removeCartItemSchema, "body"),
  removeFromCartController
);

export default router;
