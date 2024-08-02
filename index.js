const db = require("./servers/dbconfig")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

app.get('/', async (req, res) => {
  try {
    db.query("DELETE FROM customers WHERE firstname = 'boY'", (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json({ list_customers: results });
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get("/",(req,res)=>{
    res.send("Hello My Websites4")
})

require("./routes/customerRoutes")(app)

// const port = 8080 
// app.listen(port,()=>{
//     console.log("http://localhost:"+port)
// })
module.exports = app;