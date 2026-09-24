import express from "express"
import type { Request , Response } from "express"
const app = express()

app.use(express.json())


app.get("/",(_req:Request,res:Response) =>{
    res.json({
        message: "Hello, fut a szerver!"
    })
})

app.post("/",(_req:Request,res:Response) => {
    res.json({
        message: "Hello, ez egy POST kérés!"
    })
})
app.post("/a",(_req:Request,res:Response) => {
    res.send("Szöveg")
})

app.listen(3000,()=>{
    console.log("Fut a szerver!")
})