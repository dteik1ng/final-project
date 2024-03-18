import { Router } from 'express'
import {
  postCrearCodigo,
  postValidarCodigo,
  updatePassword,
} from "../controllers/recuperacioncontrasena.js";


const recuperacionRouter = Router()

recuperacionRouter.post('/crear-codigo', postCrearCodigo)
recuperacionRouter.post('/validar-codigo', postValidarCodigo)
recuperacionRouter.put('/nuevo-password',updatePassword)

export default recuperacionRouter