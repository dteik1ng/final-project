import { crearToken } from '../libs/jwt.js'
import Usuario from '../models/usuarios.js'
import bcrypt from 'bcryptjs'
import Rol from '../models/rol.js';

import { verificarToken } from '../libs/jwt.js';

//En consultarUsuario estamos buscando el usuario por medio del correo
export const login = async (req, res) => {
    try {
      const { correo, password } = req.body;
  
      const consultarUsuario = await Usuario.findOne({
        where: { correo: correo },
        include: Rol,
      });
  
      if (!consultarUsuario) {
        return res.status(404).json({
          message: "Credenciales inválidas",
        });
      }
  
      const comparar = await bcrypt.compare(
        password,
        consultarUsuario.password
      );
  
      if (!comparar) {
        return res.status(404).json({
          message: "Credenciales inválidas",
        });
      }
  
      const token = await crearToken({ correo: consultarUsuario.correo });
  
      res.cookie("token", token);
  
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        role: consultarUsuario.Rol.rolName,
        token: token,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };



export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.status(200).json({
      message: "Cierre de sesión exitoso",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const perfil = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: 'No autorizado',
      });
    }

    const data = await verificarToken(token);

    // Utiliza el correo del usuario extraído del token para buscar en la base de datos
    const consultarUsuario = await Usuario.findOne({
      where: {
        correo: data.correo,
      },
    });

    if (!consultarUsuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    const userInfo = {
      id: consultarUsuario.id,
      username: consultarUsuario.username,
      // Otros campos que desees enviar
    };

    res.status(200).json({
      perfil: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el perfil del usuario',
    });
  }
};