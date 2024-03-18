import { Router } from 'express';
import {rutaProtegida} from '../middlewares/validarToken.js';
import {historialSchema} from '../schemas/HistorialSchemas.js';
import { validarSchema } from "../middlewares/validarSchemas.js";
import { validarRolAdmin } from '../middlewares/validarRol.js';
import {getAllHistorial, getHistorial, postHistorial, deleteHistorial} from '../controllers/Historial.controller.js';

const historialRouter = Router();

historialRouter.get('/historial', rutaProtegida, validarRolAdmin,  getAllHistorial);
historialRouter.get('/historial/:id', rutaProtegida, validarRolAdmin, getHistorial);
historialRouter.post('/historial',rutaProtegida, validarRolAdmin,validarSchema(historialSchema), postHistorial);
historialRouter.delete('/historial/:id', rutaProtegida, validarRolAdmin, deleteHistorial);

export default historialRouter