import { Request, Response } from "express";
import { apiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { fetchOrderById, placeOrder } from "./service";
import {
  createOrderSchema,
  guestIdHeaderSchema,
  orderIdParamSchema,
} from "./schema";

export const createOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const { paymentMethod, shippingAddress } = createOrderSchema.parse(req.body);
    const order = await placeOrder(guestId, paymentMethod, shippingAddress);

    return res
      .status(201)
      .json(apiResponse.success("Order placed successfully", order));
  }
);

export const getOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const { "x-guest-id": guestId } = guestIdHeaderSchema.parse(req.headers);
    const { id } = orderIdParamSchema.parse(req.params);
    const order = await fetchOrderById(id, guestId);

    return res
      .status(200)
      .json(apiResponse.success("Order fetched successfully", order));
  }
);
