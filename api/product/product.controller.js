import { loggerService } from "../../services/logger.service.js";
import { productService } from "./products.service.js";




export async function getProducts(req, res) {
    const filterBy = {
        txt: req.query.txt,
        price: req.query.price
    }
    try {
        const products = await productService.query(filterBy)
        res.send(products)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't get products")
    }
}

export async function getProductById(res, req) {
    const { productId } = req.params
    try {
        const product = await productService.getById(productId)
        res.send(product)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't get product")
    }
}

export async function saveProduct(req, res) {
    const { product } = req.body
    try {
        let resProduct
        if (product._id) {
            resProduct = await productService.update(product)
        } else {
            resProduct = await productService.add(product)
        }
        res.send(resProduct)
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't save product")
    }
}

export async function removeProduct(req,res){
    const {productId} = req.params
    try {
        const deletedId = await productService.remove(productId)

        res.send(deletedId);
    } catch (err) {
        loggerService.error(err)
        res.status(400).send("Couldn't remove product")
    }
}