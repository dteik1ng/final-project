
import { Router } from "express";
import validarSchema from "../middlewares/validarSchemas.js"
import usuarioSchema from "../schemas/UsuariosSchema.js"
import { crearUsuario, getAllUsuario, getUsuario, putUsuario, deleteUsuario} from "../controllers/usuarios.controller.js";
import { rutaProtegida } from '../middlewares/validarToken.js'
import { validarRolAdmin } from "../middlewares/validarRol.js";

const usuariosRouter = Router()

usuariosRouter.get('/usuarios', /* rutaProtegida, */ getAllUsuario)
usuariosRouter.get('/usuarios/:id', /* rutaProtegida, */ getUsuario)
usuariosRouter.post('/usuarios',validarSchema(usuarioSchema), rutaProtegida, validarRolAdmin, crearUsuario)
usuariosRouter.put('/usuarios/:id',/*  rutaProtegida, validarRolAdmin, */ putUsuario)
usuariosRouter.delete('/usuarios/:id', /* rutaProtegida, validarRolAdmin, */ deleteUsuario)

export default usuariosRouter