import { Request, Response } from "express";
import { apiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  addToCart,
  fetchCartByGuestId,
  removeFromCart,
  updateCartItem,
} from "./service";
import {
  addCartItemSchema,
  guestIdHeaderSchema,
  removeCartItemSchema,
  updateCartItemSchema,
} from "./schema";

export const getCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const cart = await fetchCartByGuestId(guestId);

    return res.status(200).json(apiResponse.success("Cart fetched successfully", cart));
  }
);

export const addToCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const body = addCartItemSchema.parse(req.body);
    const cart = await addToCart(guestId, body);

    return res.status(200).json(apiResponse.success("Item added to cart", cart));
  }
);

export const updateCartItemController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const body = updateCartItemSchema.parse(req.body);
    const cart = await updateCartItem(guestId, body);

    return res.status(200).json(apiResponse.success("Cart item updated", cart));
  }
);

export const removeFromCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const { productId } = removeCartItemSchema.parse(req.body);
    const cart = await removeFromCart(guestId, productId);

    return res.status(200).json(apiResponse.success("Item removed from cart", cart));
  }
);
