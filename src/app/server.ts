import app from "./app.ts"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3001



app.listen(PORT,()=>{
    console.log(`Fut a szerver a ${PORT}-on!`)
})