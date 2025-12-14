import { Filter, ObjectId } from "mongodb"
import { dbService } from "../../services/db.service.js"
import { loggerService } from "../../services/logger.service.js"
import { genericService } from "../../services/generic.service.js"

export type FilterBy = {
    txt?: string,
    price?: number
}

export type Product = {
    _id?: ObjectId
    name: string
    description: string
    price: number
}


const COLLECTION = 'product'

const genericProductService = genericService(COLLECTION)

export const productService = {
    query,
    getById: genericProductService.getById,
    add: genericProductService.add,
    update: genericProductService.update,
    remove: genericProductService.remove
}

async function query(filterBy: FilterBy = {}) {
    const criteria = _getCriteria(filterBy)
    return genericProductService.query(criteria)
}

function _getCriteria(filterBy: FilterBy) {
    const criteria: Filter<Product> = {}
    if (filterBy.txt) {
        const regex = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            { name: regex },
            { description: regex }
        ]
    }
    if (filterBy.price) {
        criteria.price = { $lte: filterBy.price }
    }
    return criteria
}