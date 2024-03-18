import { crearToken } from '../libs/jwt.js'
import Usuario from '../models/usuarios.js'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
    try {
        const { id, password} = req.body

        const consultarUsuario = await Usuario.findByPk(id)

        if(!consultarUsuario) {
            return res.status(404).json({
                message: 'Credenciales inválidas'
            })
        }
        const comparar = await bcrypt.compare(password, consultarUsuario.password)

        if(!comparar) {
            return res.status(404).json({
                message: 'Credenciales inválidas'
            })
        }

        const token = await crearToken({id: consultarUsuario.id})
        res.cookie('token', token)
        res.status(200).json({
            message: 'Inicio de sesión exitoso'
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const logout = async (req, res) => {
    try {

        res.cookie('token','',{
            expires: new Date(0)
        })
        res.status(200).json({
            message: 'Cierre de sesión exitoso'
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const perfil = async (req, res) => {
    try {
        const consultarUsuario = await Usuario.findByPk(req.usuario.id)

        if(!consultarUsuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            perfil: consultarUsuario
        })
    } catch (error) {
        res.status(500).json(error)
    }
}