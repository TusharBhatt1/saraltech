import express from "express"
import cors from "cors"
import routes from "./routes/index.js"
const app= express()
const PORT =3001


app.use(express.json())
app.use(cors({ origin: "https://saraltech-fe.vercel.app" }));
// app.use(express.urlencoded({extended:false}))
//route file
app.use(routes)

app.listen(PORT,()=>console.log("Server is working"))
app.get("/",(req,res)=>res.send("Server is running"))