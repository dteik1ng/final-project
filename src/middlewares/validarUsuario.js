import { Op } from "sequelize";
import Rol from "../models/rol.js";

export const validarRolUsuario = async (req, res, next) => {
  try {
    const consultarRol = await Rol.findOne({
      where: {
        rolName: {[Op.like]: 'U%O'}
      },
    });

    if(!consultarRol){
      return res.status(404).json("No hay roles para asignar");
    }
    
    if (consultarRol.rolName === "USUARIO") {
      req.body.RolId = consultarRol.id
    }

    return next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
