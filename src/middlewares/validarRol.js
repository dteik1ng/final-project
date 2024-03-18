import Rol from "../models/rol.js"
import Usuario from "../models/usuarios.js"

export const validarRolAdmin = async (req, res, next) => {
    try {
        console.log(req)
        const consultarRol = await Usuario.findOne({
            where: {
                correo: req.usuario.usuario.correo
            },
            include: {
                model: Rol,
            }
        })

        if(!consultarRol){
            return res.status(401).json({
                message: 'No se encontro el usuario'
            })
        }

        if(consultarRol.Rol.rolName === 'ADMIN'){
            return next()
        }
        
        return res.status(401).json({
            message: 'No tienes el rol para hacerlo'
        })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}