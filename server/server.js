import express from "express"
import cors from "cors"
import routes from "./routes/index.js"
const app= express()
const PORT =process.env.PORT || 5000


app.use(express.json())
app.use(cors());
// app.use(express.urlencoded({extended:false}))
//route file
app.use(routes)

app.listen(PORT,()=>console.log("Server is working"))
app.get("/",(req,res)=>res.send("Server is running"))