import express from "express"
import router from "../routes/routes.ts"
import productsRoutes from "../controllers/product/routes.ts"
import cors from "cors"
//import bodyParser from "body-parser"
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use("/",router)
app.use("/",productsRoutes)
app.use(cors({
    origin: "*"
}))
//app.use(bodyParser.urlencoded({extended:true}))




export default app