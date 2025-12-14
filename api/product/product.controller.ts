import type { Request, Response } from "express";
import { loggerService } from "../../services/logger.service";
import { productService } from "./products.service";
import type { FilterBy, Product } from "./products.service";


type ProductParams = { productId: string }
type ProductDetails = {
    height: number
    width: number
    color: string
}
type FullProduct = Product & {
    label: string[]
    imgUrl: string
    radius: number
    details: ProductDetails
}

export async function getProducts(req: Request, res: Response) {
    const filterBy: FilterBy = {
        txt: req.query?.toString() || '',
        price: Number(req.query?.price) || undefined
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