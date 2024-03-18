import metodopago from "../models/metodopago.js";

export const crearmetodoPago = async (req, res) => {
    try {
        const consulta = await metodopago.findOne({
            where:{ nombre: req.body.nombre}
        })

        if(consulta){
            return res.status(400).json({
                message: 'La categoria ya existe'
            })
        }

        const crearCategoria = await metodopago.create(req.body)
        
        const response = await crearCategoria.save()
        
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllmetodoPago = async (req, res) => {
    try {
        const consultarCategorias = await metodopago.findAll()

        res.status(200).json(consultarCategorias)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

export const getmetodoPago = async (req, res) => {
    try {
        const consultarCategorias = await metodopago.findByPk(req.params.id)

        if(!consultarCategorias) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            })
        }

        res.status(200).json(consultarCategorias)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const putmetodopago = async (req, res) => {
    try {
        const consultarCategorias = await metodopago.findByPk(req.params.id)

        if(!consultarCategorias) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            })
        }

        await consultarCategorias.update({nombre: req.body.nombre})

        res.status(200).json({
            message: 'categoria actualizada'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const deletemetodopago = async (req, res) => {
    try {
        const consultarCategorias = await metodopago.findByPk(req.params.id)

        if(!consultarCategorias) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            })
        }

        await consultarCategorias.destroy()

        res.status(200).json({
            message: `Categoria ${consultarCategorias.nombre} eliminada`
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

