import {Router} from "express"
import { getProduct,setProducts,getProductById,updateProduct,updateProductPatch,deleteProduct } from "./controller.ts"

const router: Router = Router()
router.get("/products",getProduct)
router.get("/product/:id",getProductById)
router.post("/product",setProducts)
router.put("/product/:id",updateProduct)
router.patch("/product/:id",updateProductPatch)
router.delete("/product/:id",deleteProduct)

export default router