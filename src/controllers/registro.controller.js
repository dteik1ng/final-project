import Usuario from "../models/usuarios.js";
import Rol from "../models/rol.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

//controlador del usuario
export const crearUsuario = async (req, res) => {
  try {
    const consulta = await Usuario.findByPk(req.body.id);

    if (consulta) {
      return res.status(400).json({
        message: "El id del usuario ya existe",
      });
    }

    let data = req.body;

    var salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const crearUser = await Usuario.create(data);

    const guardar = await crearUser.save();
    res.status(201).json(guardar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findAll();

    res.status(200).json(consultarUsuarios);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findByPk(req.params.id);

    if (!consultarUsuarios) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json(consultarUsuarios);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const putUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findByPk(req.params.id);

    if (!consultarUsuarios) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (req.body.RolId) {
      const consultaRol = await Rol.findByPk(req.body.RolId);
      if (!consultaRol) {
        return res.status(400).json({
          message: "Rol no encontrado",
        });
      }
    }

    let data = req.body;
    if (data.password) {
      var salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }

    await consultarUsuarios.update(data);

    res.status(200).json({
      message: "Usuario actualizado",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
