import type {Response, Request} from "express"
import data from "../../app/data/data.ts"
import { Product, ProductManager, type IProduct } from "./product.ts"

export const getProduct = (_req:Request,res:Response) => {
    const products = new ProductManager(data)
    res.send(
        products.allProductsData
    )
}

export const  setProducts = (req:Request,res:Response) => {
    const newProduct: Product = new Product(req.body)
    const products = new ProductManager(data)
    products.addProduct(newProduct)
    res.send(products.allProductsData)
}

export const getProductById = (req:Request,res:Response):void => {
    const products = new ProductManager(data)
    const productId: number = parseInt(req.params.id as string)
    console.log("Product ID:", productId) // Debugging line to check the received ID
    const product: Product | undefined = products.getProductById(productId)
    if (product) {
        res.send(product)
        return
    }
    res.status(404).send("Product not found")   
}

export const updateProduct = (req:Request,res:Response):void => {
    const products = new ProductManager(data)
    const productId: number = parseInt(req.params.id as string) 
    
    
 if (!checkRequiredFields(req.body,products.allProductsData[0] as IProduct)) {
        res.status(400).send("Missing required fields")
        return
    }   


 // Check if the product exists
    const product = products.getProductById(productId)
    if (!product) {
        products.addProduct(req.body)
        res.send(products.allProductsData[products.allProductsData.length - 1]) // Return the newly added product
        return
    }
    const updatedProduct: Product = new Product(req.body)
    products.updateProduct(productId, updatedProduct)
    res.send(products.allProductsData)
}


const  checkRequiredFields = (body: IProduct,product: IProduct): boolean => {
     // Exclude 'id' from required fields
     const requiredFields = Object.keys(product).filter(key => key !== 'id')
    console.log("Required fields:", requiredFields) // Debugging line to check the required fields
    return requiredFields.every(field => body.hasOwnProperty(field));
}
