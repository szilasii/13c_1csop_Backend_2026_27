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
    const products: ProductManager = new ProductManager(data)
    const productId: number = parseInt(req.params.id as string) 
    
    
 if (!checkRequiredFields(req.body,products.allProductsData[0] as IProduct)) {
        res.status(400).send("Missing required fields")
        return
    }   


 // Check if the product exists
    const product = products.getProductById(productId)
    if (!product) {
        res.send(products.getProductById(products.addProduct(req.body))) // Return the newly added product
        return
    }
    const updatedProduct: Product = new Product(req.body)
    products.updateProduct(productId, updatedProduct)
    res.send(products.allProductsData)
}

export const updateProductPatch = (req:Request,res:Response):void => {
     if (!req.body || typeof req.body !== 'object') {
        res.status(400).send("Invalid request body");
        return;
    }
    const products = new ProductManager(data)
    const productId: number = parseInt(req.params.id as string) 

    const update = products.updateProduct(productId, req.body)
     if (!update) {
        res.status(404).send("Product not found")
        return
    }
    res.send(products.getProductById(productId))
}

export const deleteProduct = (req:Request,res:Response):void => {
    const products = new ProductManager(data)
    const productId: number = parseInt(req.params.id as string) 
    const deleted = products.deleteProduct(productId)   
    if (!deleted) {
        res.status(404).send("Product not found")
        return
    }
    console.log(products.allProductsData) // Debugging line to confirm deletion
    res.status(204).send()
}

const  checkRequiredFields = (body: IProduct,product: IProduct): boolean => {
    if (!body || typeof body !== 'object') {
        return false;
    }
    const requiredFields = Object.keys(product).filter(key => key !== 'id')
    return requiredFields.every(field => body.hasOwnProperty(field));
}
