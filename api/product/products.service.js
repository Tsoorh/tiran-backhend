import { ObjectId } from "mongodb"
import { dbService } from "../../services/db.service.js"
import { loggerService } from "../../services/logger.service.js"
import { genericService } from "../../services/generic.service.js"



const COLLECTION = 'product'

const genericProductService = genericService(COLLECTION)

export const productService ={
    query,
    getById:genericProductService.getById,
    add:genericProductService.add,
    update:genericProductService.update,
    remove:genericProductService.remove
}

async function query(filterBy) {
    const criteria = _getCriteria(filterBy)
    return genericProductService.query(criteria)
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