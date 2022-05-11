const ProductRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/updateFile.middleware");

const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require("./products.controller");

ProductRoutes.get("/", getAll);
ProductRoutes.get("/:id", getOne);
ProductRoutes.post("/", [isAuth], upload.single("img"), postOne);
ProductRoutes.patch("/:id", [isAuth], upload.single("img"), patchOne);
ProductRoutes.delete("/:id", [isAuth], deleteOne);

module.exports = ProductRoutes;
