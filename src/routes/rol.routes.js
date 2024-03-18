
import { Router } from 'express'
import { getAllRol, getRol } from '../controllers/rol.controller.js'

const rolRouter = Router()

rolRouter.get('/roles',getAllRol)
rolRouter.get('/roles/:id', getRol)

export default rolRouter