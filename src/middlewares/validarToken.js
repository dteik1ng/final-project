import { verificarToken } from "../libs/jwt.js"

export const rutaProtegida = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if(!token){
            return res.status(401).json({
                message: 'No autorizado'
            })
        }

        const data = await verificarToken(token)
        req.usuario = data
        next()
    } catch (error) {
        return res.status(500).json({message: error})
    }
}