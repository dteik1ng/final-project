import { Router } from "express";
/* import { prueba } from "../controller/funciona.js"; */
import validarSchema from "../middlewares/validarSchemas.js"
import { crearmetodoPago, deletemetodopago, getAllmetodoPago, getmetodoPago, putmetodopago } from "../controllers/metodoPago.controller.js";
import { metodopagoSchema } from "../schemas/metodopago.js";
import { rutaProtegida } from "../middlewares/validarToken.js";
import { validarRolAdmin } from "../middlewares/validarRol.js";

const metodopagoRouter = Router()

metodopagoRouter.get('/metodopago', getAllmetodoPago )
metodopagoRouter.get('/metodopago/:id', getmetodoPago)
metodopagoRouter.post('/metodopago',/* rutaProtegida, validarRolAdmin, validarSchema(metodopagoSchema), */ crearmetodoPago)
metodopagoRouter.put('/metodopago/:id',/* rutaProtegida, validarRolAdmin, */ putmetodopago)
metodopagoRouter.delete('/metodopago/:id',/* rutaProtegida, validarRolAdmin, */ deletemetodopago)

export default metodopagoRouter