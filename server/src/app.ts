import express from "express";
import cors from "cors";
import productRoute from "./modules/product/route";
import cartRoute from "./modules/cart/route";
import orderRoute from "./modules/order/route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

const app = express();
const apiV1 = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get("/health", (_req, res) => {
  return res.status(200).send("OK");
});

app.use(`${apiV1}/products`, productRoute);
app.use(`${apiV1}/cart`, cartRoute);
app.use(`${apiV1}/orders`, orderRoute);

app.use(errorMiddleware);

export default app;
