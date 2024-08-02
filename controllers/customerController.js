const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_access_token = "ASFWEFWEFFRG3434R$#@#&@#";
const db = require("../servers/dbconfig");
const getList = (req, res) => {
  // res.send("Hello")
  db.query("SELECT * FROM customers", (err, rows) => {
    res.json({
      list_customers: rows,
    });
  });
};
const remove = (req, res) => {
    db.query("DELETE FROM customers WHERE uid = " +req.params.id,(err,rows)=>{
        if (err) {
            res.json({
              error: true,
              message: err,
            })
          } else{
            if(rows.affectedRows !=0){res.json({
                message:"deleted",
                list_customers :rows
            })}else{

                res.json({
                    message:"Delete not completed not found!"
                })
            }
            
          }
          
    })
    
};
const update = (req, res) => {
  var body = req.body;
  console.log(body);
  var image = null;
  if (req.file) {
    image = req.file.filename;
  }
   var sqlUpdate = "UPDATE customers SET firstname = ?,lastname = ?, gender = ? , email = ?, image = ? WHERE uid = ?";
  db.query(sqlUpdate, [body.firstname,body.lastname,body.gender,body.email,image,body.uid], (err, rows) => {
    if (err) {
      res.json({
        error: true,
        message: err,
      });
    } else {
      res.json({
        message: "updated successfully",
        list_customers: rows,
      });
    }
  });
};
const create = (req, res) => {
  var body = req.body;
  var image = null;
  var password = bcrypt.hashSync(body.password,10);
  if (req.file) {
    image = req.file.filename;
  }
  var sqlInsert = "INSERT INTO customers(firstname,lastname,gender,email,image,password) Values(?,?,?,?,?,?)";
  db.query(sqlInsert, [body.firstname,body.lastname,body.gender,body.email,image,password], (err, rows) => {
    if (err) {
      res.json({
        error: true,
        message: err,
      });
    } else {
      res.json({
        message: "successfully",
        list_customers: rows,
      });
    }
  });
};

const uploadImage = (req, res) => {
  res.json({
    body: req.body,
    // params: req.params,
    file: req.file,
  });
};
// const login = (req, res) => {

//   var { email, password } = req.body;
//   if (email == null || email == "") {
//     res.json({
//       error: true,
//       message: "Please fill in email",
//     });
//     return;
//   } else if (password == null || password == "") {
//     res.json({
//       error: true,
//       message: "Please fill in password",
//     });
//     return;
//   }
//   db.query(
//     "SELECT * FROM customers WHERE email = ?",
//     [email],
//     (err, result) => {
//       if (err) {
//         res.json({
//           error: true,
//           message: err,
//         });
//       } else {
//         if (result.length == 0) {
//           res.json({
//             error: true,
//             message: "Email does not exist! Please register!",
//           });
//         } else {
//           var data = result[0];
//           var passwordInDb = data.password;
//           var isCorrectPassword = bcrypt.compareSync(password, passwordInDb);
//           if (isCorrectPassword) {
//             delete data.password;
//             data.email;
//             var token = jwt.sign({ profile: data }, secret_access_token);
//             res.json({
//               is_login: true,
//               profile: result,
//               message: "Login success!",
//               profile: data,
//               token: token,
//             });
//           } else {
//             res.json({
//               message: "Incorrect password!",
//             });
//           }
//         }
//       }
//     }
//   );
// };
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ // Change to 400 Bad Request
      error: true,
      message: "Please fill in email",
    });
  } else if (!password) {
    return res.status(400).json({ // Change to 400 Bad Request
      error: true,
      message: "Please fill in password",
    });
  }

  db.query(
    "SELECT * FROM customers WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ // 500 Internal Server Error for database issues
          error: true,
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({ // 404 Not Found when email doesn't exist
          error: true,
          message: "Email does not exist! Please register!",
        });
      }

      const data = result[0];
      const passwordInDb = data.password;
      const isCorrectPassword = bcrypt.compareSync(password, passwordInDb);

      if (isCorrectPassword) {
        delete data.password;
        const token = jwt.sign({ profile: data }, secret_access_token, { expiresIn: '1h' });
        return res.status(200).json({ // 200 OK for successful login
          is_login: true,
          profile: data,
          message: "Login success!",
          token: token,
        });
      } else {
        return res.status(401).json({ // 401 Unauthorized for incorrect password
          error: true,
          message: "Incorrect password!",
        });
      }
    }
  );
};
module.exports = { getList, update, remove, create,uploadImage,login };
