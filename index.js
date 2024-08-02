const db = require("./servers/dbconfig")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:"*"}))



app.get("/",(req,res)=>{
    res.send("Hello My Website")
})

require("./routes/customerRoutes")(app)

const port = 8080
app.listen(port,()=>{
    console.log("http://localhost:"+port)
})