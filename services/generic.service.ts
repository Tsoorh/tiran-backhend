import { ObjectId } from "mongodb"
import { dbService } from "./db.service"
import { loggerService } from "./logger.service"
import type { OptionalId, Document } from "mongodb"

// type ItemDetails = {
//     height: number,
//     width: number,
//     color: string
// }

// type Item = {
//     _id?: ObjectId,
//     description: string,
//     label?: string[],
//     name: string,
//     price: number,
//     Details: ItemDetails,
//     imgUrl: string,
//     radius: number
// }


export function genericService(collectionName: string) {


    async function _getCollection() {
        return dbService.getCollection(collectionName)
    }

    async function query(criteria = {}) {
        try {
            const collection = await _getCollection()
            return await collection.find<[]>(criteria).toArray() // שאילתה גנרית
        } catch (err) {
            loggerService.error(`Couldn't query items from ${collectionName}`, err)
            throw err
        }
    }

    async function getById(id: string | ObjectId) {
        try {
            const collection = await _getCollection()
            const criteria = { _id: new ObjectId(id) }
            return await collection.findOne(criteria)
        } catch (err) {
            loggerService.error(`Couldn't get item from ${collectionName} by id: ${id}`, err)
            throw err
        }
    }

    async function add<T extends Document>(item: OptionalId<T>): Promise<T> {
        try {
            const collection = await _getCollection()
            const res = await collection.insertOne(item)
            if (!res.acknowledged) throw new Error(`Couldn't add item to ${collectionName}`)
            const newItem = {
                ...item,
                _id: res.insertedId
            } as T
            return newItem
        } catch (err) {
            loggerService.error(`Couldn't add item to ${collectionName}`, err)
            throw err
        }
    }

    async function update<T extends Document>(item: T): Promise<T> {
        try {
            const collection = await _getCollection()
            const criteria = { _id: new ObjectId(item._id) }
            const itemToUpdate = { ...item }
            delete itemToUpdate._id

            const set = { $set: itemToUpdate }
            const res = await collection.updateOne(criteria, set)

            if (res.matchedCount === 0) throw new Error(`Couldn't find item to update in ${collectionName}`)
            return item
        } catch (err) {
            loggerService.error(`Couldn't update item in ${collectionName}`, err)
            throw err
        }
    }

    async function remove(id: string | ObjectId) {
        try {
            const collection = await _getCollection()
            const criteria = { _id: new ObjectId(id) }
            const res = await collection.deleteOne(criteria)

            if (res.deletedCount === 0) throw new Error(`Couldn't remove item from ${collectionName}. ID not found.`);

            return id
        } catch (err) {
            loggerService.error(`Couldn't remove item from ${collectionName}`, err)
            throw err
        }
    }

    return {
        query,
        getById,
        add,
        update,
        remove
    }
}


