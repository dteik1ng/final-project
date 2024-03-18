import Rol from '../models/rol.js'

export const getAllRol = async (req, res) => {
    try {
        let roles = await Rol.findAll()

        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getRol = async (req, res) => {
    try {
        let rol = await Rol.findByPk(req.params.id)

        if (!rol){
            return  res.status(404).json({mensaje: "No se encontró el"})
        }
        
        res.status(200).json(rol)
    } catch (error) {
        res.status(500).json(error)
    }
}
