const express = require("express");
const cors = require("cors");
const { setError } = require("./src/utils/error/error");

const { connect } = require("./src/utils/database/db");

const { configCloudinary } = require("./src/utils/cloudinary/config");

const ProductRoutes = require("./src/api/products/products.routes");
const UserRoutes = require("./src/api/users/users.routes");

const PORT = process.env.PORT || 8080;

const app = express();

connect();

configCloudinary();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes);

app.use("*", (req, res, next) => {
  return next(setError(404, "Ruta no encontrada"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Error inesperado");
});

app.disable("x-powered-by");

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
