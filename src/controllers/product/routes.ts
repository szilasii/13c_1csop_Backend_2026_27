import {Router} from "express"
import { getProduct,setProducts } from "./controller.ts"

const router: Router = Router()
router.get("/products",getProduct)
router.post("/product",setProducts)

export default router