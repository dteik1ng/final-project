
import { Router } from 'express'
import validarSchema from "../middlewares/validarSchemas.js"
import { categoriaSchema } from '../schemas/categoriaSchema.js'
import { crearCategoria, getAllCategoria, getCategoria, putCategoria, deleteCategoria} from '../controllers/categoria.controller.js';
import { rutaProtegida } from '../middlewares/validarToken.js';
import { validarRolAdmin } from '../middlewares/validarRol.js';
const categoriaRouter = Router()

categoriaRouter.get('/categorias',/* rutaProtegida,  */getAllCategoria)
categoriaRouter.get('/categorias/:id',/* rutaProtegida, */ getCategoria)
categoriaRouter.post('/categorias',/* rutaProtegida,validarRolAdmin, validarSchema(categoriaSchema), */ crearCategoria)
categoriaRouter.put('/categorias/:id',/* rutaProtegida,validarRolAdmin, */ putCategoria)
categoriaRouter.delete('/categorias/:id',/* rutaProtegida,validarRolAdmin, */ deleteCategoria)

export default categoriaRouter