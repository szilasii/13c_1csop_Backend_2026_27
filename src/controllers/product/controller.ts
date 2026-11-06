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

export const updateProduct = async  (req:Request,res:Response):Promise<void> => {

       if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const { id } = req.params
    if (!Number(id)) {
        res.status(400).send("Nem adott meg ID-t vagy az nem szám!")
        return
    }

    let reqProduct: any = new Product(req.body as unknown as IProduct)

    if (!checkRequiredFields(req.body as unknown as IProduct, reqProduct.toJSON())) {
        res.status(400).send("Hiányzó mezők!")
        return
    }
    try {
        const productManager = new ProductManager()
        const changedProduct =await productManager.updateProduct(Number(id), reqProduct.toJSON())
        console.log("Changed product:", changedProduct); // Debugging line to check the changed product
        if (!changedProduct){
            res.status(404).send({ message: "Product not found" });
        return;
    }
     
    res.send({ message: "Product updated successfully", product: changedProduct });
    } catch (error) {
        res.status(500).send("Hiba történt a termék frissítésekor!")
        return
    }
        
    
   
}

export const updateProductPatch = (req:Request,res:Response):void => {
     
}

export const deleteProduct = async (req:Request,res:Response):Promise<void> => {
   const { id } = req.params
   const productManager = new ProductManager
   const deleted = await productManager.deleteProduct(Number(id))
   if (deleted) {
       res.status(204).send({ message: "Product deleted successfully" });
   } else {
       res.status(404).send({ message: "Product not found" });
   }
}

const  checkRequiredFields = (body: IProduct,product: IProduct): boolean => {
    if (!body || typeof body !== 'object') {
        return false;
    }
    const requiredFields = Object.keys(product).filter(key => key !== 'id')
    return requiredFields.every(field => body.hasOwnProperty(field));
}
