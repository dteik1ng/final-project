
import { Router } from "express";
import { upload } from "../variables.js";
import { crearProduto, getAllProducto, getProducto, deletetProducto, putProducto } from "../controllers/producto.controller.js";
import { rutaProtegida } from "../middlewares/validarToken.js";
import { validarRolAdmin } from "../middlewares/validarRol.js";

const productosRouter = Router()

productosRouter.get('/productos', /* rutaProtegida, */ getAllProducto)
productosRouter.get('/productos/:id', /* rutaProtegida, */getProducto)
productosRouter.post('/productos', rutaProtegida, validarRolAdmin, upload.single('imagen'), crearProduto)
productosRouter.put('/productos/:id', rutaProtegida, validarRolAdmin, upload.single('imagen'),  putProducto)
productosRouter.delete('/productos/:id', rutaProtegida, deletetProducto)

export default productosRouter