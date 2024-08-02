const multer = require("multer");
const image_path = "https://github.com/sophorspheng/backendweb/tree/main/image";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, image_path);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const customerController = require("../controllers/customerController");
const customerRoute = (app) => {
  app.get("/getList", customerController.getList);
  app.delete("/remove/:id", customerController.remove);
  app.put("/update", upload.single("myfile"), customerController.update);
  app.post("/create", customerController.create);
  app.post("/login", customerController.login);
};

module.exports = customerRoute;
