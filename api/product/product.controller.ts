import type { Request, Response } from "express";
import { loggerService } from "../../services/logger.service";
import { productService } from "./products.service";
import { FullProduct, ProductParams, FilterBy } from "../../model/product.model";




export async function getProducts(req: Request, res: Response) {
    const { txt, price, category } = req.query

    const filterBy: FilterBy = {
        txt: (txt as string) || '',
        price: (price !== undefined && !isNaN(+price)) ? +price : undefined,
        category: (category as string) || ''
    }
    try {
        const products = await productService.query(filterBy)
        res.send(products)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't get products")
    }
}

export async function getProductById(req: Request<ProductParams>, res: Response) {
    const { productId } = req.params
    try {
        const product = await productService.getById(productId)
        res.send(product)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't get product")
    }
}

export async function saveProduct(req: Request, res: Response): Promise<void> {
    const product = req.body.product as FullProduct
    try {
        let savedProduct: FullProduct
        if (product._id) {
            savedProduct = await productService.update(product)
        } else {
            savedProduct = await productService.add(product)
        }
        res.send(savedProduct)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't save product")
    }
}

export async function removeProduct(req: Request<ProductParams>, res: Response) {
    const { productId } = req.params
    try {
        const deletedId = await productService.remove(productId)

        res.send(deletedId);
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't remove product")
    }
}