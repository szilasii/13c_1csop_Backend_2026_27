import type {Response, Request} from "express"
import { Product, ProductManager, type IProduct } from "./product.ts"

export const getProduct = (_req:Request,res:Response) => {
    const products = new ProductManager()
    res.send(
        products.allProductsData()
    )
}

export const  setProducts = (req:Request,res:Response) => {
   
}

export const getProductById = (req:Request,res:Response):void => {
    
}

export const updateProduct = (req:Request,res:Response):void => {
   
}

export const updateProductPatch = (req:Request,res:Response):void => {
     
}

export const deleteProduct = (req:Request,res:Response):void => {
   
}

const  checkRequiredFields = (body: IProduct,product: IProduct): boolean => {
    if (!body || typeof body !== 'object') {
        return false;
    }
    const requiredFields = Object.keys(product).filter(key => key !== 'id')
    return requiredFields.every(field => body.hasOwnProperty(field));
}
