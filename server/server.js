import express from "express"
import cors from "cors"
import routes from "./routes/index.js"
const app= express()
const PORT =5000


app.use(express.json())
app.use(cors());

app.use(routes)

app.listen(PORT,()=>console.log(`Server is working on port ${PORT}`))
app.get("/",(req,res)=>res.send("Server is running"))