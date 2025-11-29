import { ObjectId } from "mongodb"
import { dbService } from "../../services/db.service.js"
import { loggerService } from "../../services/logger.service.js"

const COLLECTION = 'product'

export const productService = {
    query,
    getById,
    add,
}

export async function query(filterBy) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = _getCriteria(filterBy)

        const productsCursor = await collection.find(criteria)
        const products = productsCursor.toArray()
        return products
    } catch (err) {
        loggerService.error("Couldn't get products")
        throw err
    }
}

export async function getById(productId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { _id: new ObjectId(productId) }

        const product = await collection.findOne(criteria)
        return product
    } catch (err) {
        loggerService.error("Couldn't get product")
        throw err
    }

}

export async function add(product) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const res = await collection.insertOne(product)

        if (!res.acknowledged) throw new Error("Couldn't add product")
        product._id = res.insertedId

        return product
    } catch (err) {
        loggerService.error("Couldn't add product")
        throw err
    }
}
export async function update(product) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { _id: new ObjectId(product._id) }
        const set = { $set: product }
        const res = await collection.updateOne(criteria, set)

        if (res.matchedCount === 0 ) throw new Error("Couldn't find product to update")

        return product
    } catch (err) {
        loggerService.error("Couldn't update product")
        throw err
    }
}

export async function remove(productId) {
        try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { _id: new ObjectId(productId) }
        const res = await collection.deleteOne(criteria)

        if (res.deletedCount === 0 ) throw new Error("Couldn't remove product to update");

        return productId
    } catch (err) {
        loggerService.error("Couldn't add product")
        throw err
    }
}

function _getCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.name = { $regex: filterBy.txt }
        criteria.description = { $regex: filterBy.txt }
    }
    if (filterBy.price) {
        criteria.price = { $lte: filterBy.price }
    }
    return criteria
}