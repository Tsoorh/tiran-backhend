import { ObjectId } from "mongodb"

export type FilterBy = {
    txt?: string
    price?: number
    category?:string
}

export type Product = {
    _id?: ObjectId
    name: string
    description: string
    price: number
}

export type ProductParams = { productId: string }

type ProductSize = {
    height: number
    radius: number
}
type SocketType = {
    screwType: string
    lightType: string
}

export type FullProduct = Product & {
    category:string[]
    imgUrl: string[]
    radius: number
    size: ProductSize
    socketType:SocketType
    material:string[]
}