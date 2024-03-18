import { Router } from "express";
import { creardetalleFactura,getAllDetalleFactura,getDetalleFactura,putDetalleFactura,deleteDetalleFactura } from "../controllers/detalleFactura.controller.js"
import {rutaProtegida} from '../middlewares/validarToken.js';
import {validarRolUsuario} from "../middlewares/validarUsuario.js"
import  validarSchema  from "../middlewares/validarSchemas.js";
import { detalleFacturaSchema} from "../schemas/detalleFacturaSchema.js"

const detalleFacturaRouter = Router()

detalleFacturaRouter.get('/detalleFactura',rutaProtegida,validarRolUsuario, getAllDetalleFactura)
detalleFacturaRouter.get('/detalleFactura/:id',rutaProtegida,validarRolUsuario, getDetalleFactura)
detalleFacturaRouter.post('/detalleFactura',/* rutaProtegida, */ validarSchema(detalleFacturaSchema),creardetalleFactura )
detalleFacturaRouter.put('/detalleFactura/:id',rutaProtegida,validarRolUsuario, putDetalleFactura)
detalleFacturaRouter.delete('/detalleFactura/:id',rutaProtegida,validarRolUsuario, deleteDetalleFactura)

export default detalleFacturaRouter