import { Request, Response } from "express";
import { apiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { fetchProductById, fetchProducts } from "./service";
import { listProductsQuerySchema, productIdParamSchema } from "./schema";

export const getProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = productIdParamSchema.parse(req.params);
    const product = await fetchProductById(id);

    return res
      .status(200)
      .json(apiResponse.success("Product fetched successfully", product));
  }
);

export const getProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const query = listProductsQuerySchema.parse(req.query);
    const result = await fetchProducts(query);

    return res
      .status(200)
      .json(apiResponse.success("Products fetched successfully", result));
  }
);
