import { Router } from 'express'
import { login, logout, perfil } from '../controllers/login.controller.js';
import { rutaProtegida } from '../middlewares/validarToken.js';
import validarSchema from '../middlewares/validarSchemas.js';
import { loginSchema } from '../schemas/LoginSchemas.js';


const LoginRouter = Router()

LoginRouter.post('/login',validarSchema(loginSchema), login)
LoginRouter.post('/logout', logout)
LoginRouter.get('/perfil',rutaProtegida, perfil)

export default LoginRouter