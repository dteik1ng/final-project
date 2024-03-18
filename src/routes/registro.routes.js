import { Router } from "express";
import validarSchema from "../middlewares/validarSchemas.js"
import usuarioSchema from "../schemas/UsuariosSchema.js"
import { crearUsuario, getAllUsuario, getUsuario, putUsuario} from "../controllers/registro.controller.js";
/* import { rutaProtegida } from '../middlewares/validarToken.js' */
import { validarRolUsuario } from "../middlewares/validarUsuario.js";
const registroRouter = Router()

registroRouter.get('/registro', getAllUsuario)
registroRouter.get('/registro/:id',getUsuario)
registroRouter.post('/registro', validarSchema(usuarioSchema), validarRolUsuario, crearUsuario)
registroRouter.put('/registro/:id',validarRolUsuario, putUsuario)

export default registroRouter