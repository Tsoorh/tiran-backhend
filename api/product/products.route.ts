import express from 'express';
import { getProductById, getProducts, removeProduct, saveProduct } from './product.controller';

const routes = express.Router()

routes.get("/", getProducts)
routes.get("/:productId", getProductById)
routes.post("/", saveProduct)
routes.put("/", saveProduct)
routes.delete("/:productId", removeProduct)


export const productRoutes = routes