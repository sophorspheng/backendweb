const mysql = require("mysql")
const db = mysql.createConnection({
    host:"b9xeyyavflld3pad5uxl-mysql.services.clever-cloud.com"
    ,user:"ut0odint5meg1okk"
    ,password:"Aw0yiwuUWHgqhgDF35vF",
    database:"b9xeyyavflld3pad5uxl",
    port: 3306
})
module.exports = db;