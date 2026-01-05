import { Filter, ObjectId } from "mongodb"
import { dbService } from "../../services/db.service"
import { loggerService } from "../../services/logger.service"
import { genericService } from "../../services/generic.service"
import { FilterBy, Product } from "../../model/product.model"



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
            { "name.en": regex },
            { "name.he": regex },
            { "description.en": regex },
            { "description.he": regex }
        ]
    }
    if (filterBy.price) {
        criteria.price = { $lte: filterBy.price }
    }
    if (filterBy.category) {
        const regex= { $regex: filterBy.category, $options: 'i' }
        criteria.$or = [
            {"category.en" : regex},
            {"category.he" : regex}
        ]
    }
    return criteria
}