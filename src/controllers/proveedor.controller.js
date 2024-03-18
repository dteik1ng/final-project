import Proveedor from "../models/proveedores.js";

export const  crearProveedor = async (req, res) => {
    try {
        const consulta = await Proveedor.findOne({
            where:{
                id: req.body.id
            }
        })

        if(consulta){
            return res.status(400).json({
                message: 'El id del proveedor ya existe'
            })
        }

        const crearProveedor = await Proveedor.create(req.body)
        
        const response = await crearProveedor.save()
        
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const getAllProveedor = async (req, res) => {
 try {
    const consultarProveedor = await Proveedor.findAll()

    res.status(200).json(consultarProveedor)
 } catch (error) {
    res.status(500).json(error.message)
 }
}


export const getProveedores = async (req, res ) =>{
    try {
        const consultarProveedor = await Proveedor.findByPk(req.params.id)

        if (!consultarProveedor) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            })
        }

        res.status(200).json(consultarProveedor)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const putProveedores = async (req, res) => {
    try {
        const consultarProveedor = await Proveedor.findByPk(req.params.id)

        if (!consultarProveedor) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            })
        }

        await  consultarProveedor.update(req.body)

        res.status(200).json({
            message: 'proveedor modificado'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const deleteProveedores = async (req, res) => {
    try {
        const consultarProveedor = await Proveedor.findByPk(req.params.id)

        if (!consultarProveedor) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            })
        }

        await  consultarProveedor.destroy()

        res.status(200).json({
            message: 'Proveedor eliminado'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

