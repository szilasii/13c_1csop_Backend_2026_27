import type {Response, Request} from "express"
import data from "../../app/data/data.ts"

export const getProduct = (_req:Request,res:Response) => {
    res.send(
        data
    )
}

export const  setProducts = (req:Request,res:Response) => {
    console.log(req.body)
    res.send(req.body)
}