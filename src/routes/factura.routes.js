import { Router } from 'express'
import validarSchema from "../middlewares/validarSchemas.js";
import { crearFactura/* deleteAllFactura, deleteFactura, getAllFactura, */ /* getFacturaByCodigo, */ /* putFactura  */} from '../controllers/factura.controller.js';
import { facturaschemas } from '../schemas/facturaschemas.js'
/* import { rutaProtegida } from '../middlewares/validarToken.js';  */

const facturaRouter = Router()

/* facturaRouter.get('/facturas/:codigo', rutaProtegida, getFacturaByCodigo) */
facturaRouter.post('/facturas', /* validarSchema(facturaschemas),  */crearFactura)
/* facturaRouter.put('/facturas/:id', putFactura)
facturaRouter.delete('/facturas/:id', deleteFactura)
facturaRouter.delete('/facturas-delete/:codigo', deleteAllFactura) */

export default facturaRouter