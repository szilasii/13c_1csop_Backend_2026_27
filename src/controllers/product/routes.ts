import {Router} from "express"
import { getProduct,setProducts,getProductById,updateProduct } from "./controller.ts"

const router: Router = Router()
router.get("/products",getProduct)
router.get("/product/:id",getProductById)
router.post("/product",setProducts)
router.put("/product/:id",updateProduct)

export default router