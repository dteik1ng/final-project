
import { Router } from 'express'
import validarSchema from '../middlewares/validarSchemas.js';
import { proveedorSchemas } from '../schemas/proveedorschema.js';
import { crearProveedor, getAllProveedor, getProveedores, putProveedores, deleteProveedores } from '../controllers/proveedor.controller.js';
import { rutaProtegida } from '../middlewares/validarToken.js';
import { validarRolAdmin } from '../middlewares/validarRol.js';
/* import { validarProveedor } from '../middlewares/validarProveedor.js';
 */
const proveedorRouter = Router()

proveedorRouter.get('/proveedores', /* rutaProtegida, validarRolAdmin, */ getAllProveedor )
proveedorRouter.get('/proveedores/:id',/* rutaProtegida,validarRolAdmin, */getProveedores)
proveedorRouter.post('/proveedores',/* rutaProtegida,validarRolAdmin, validarSchema(proveedorSchemas), */ crearProveedor)
proveedorRouter.put('/proveedores/:id',/* rutaProtegida,validarRolAdmin, */ putProveedores)
proveedorRouter.delete('/proveedores/:id',/* rutaProtegida, validarRolAdmin, */deleteProveedores)
    
export default proveedorRouter
