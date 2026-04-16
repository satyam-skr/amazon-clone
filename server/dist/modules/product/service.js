"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductById = fetchProductById;
exports.fetchProducts = fetchProducts;
const ApiError_1 = require("../../utils/ApiError");
const repository_1 = require("./repository");
async function fetchProductById(id) {
    const product = await (0, repository_1.getProductById)(id);
    if (!product) {
        throw new ApiError_1.ApiError(404, "Product not found");
    }
    return product;
}
async function fetchProducts(query) {
    return (0, repository_1.getProducts)(query);
}
