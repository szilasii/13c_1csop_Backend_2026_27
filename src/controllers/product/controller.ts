import type {Response, Request} from "express"
import { Product, ProductManager, type IProduct } from "./product.ts"

export const getProduct = async (_req:Request,res:Response) => {
    const products = new ProductManager()
    res.send(
       await products.allProductsData()
    )
}

export const  setProducts = async (req:Request,res:Response) => {
   const product = new ProductManager()
    const productData: Partial<IProduct> = req.body
    const newProductId = await product.addProduct(productData) as unknown as number | undefined
    if (!newProductId) {
        res.status(500).send({ message: "Failed to add product" });
        return;
    }
    res.send({ message: "Product added successfully", id: newProductId });
}

export const getProductById = async (req:Request,res:Response):Promise<void> => {
    const { id } = req.params
    const productManager = new ProductManager()
    const product = await productManager.getProductById(Number(id))
    if (!product) {
        res.status(404).send({ message: "Product not found" });
        return;
    }
    res.send(product)
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
