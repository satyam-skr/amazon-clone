import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { getProductController, getProductsController } from "./controller";
import { listProductsQuerySchema, productIdParamSchema } from "./schema";

const router = Router();

router.get("/", validate(listProductsQuerySchema, "query"), getProductsController);
router.get("/:id", validate(productIdParamSchema, "params"), getProductController);

export default router;
