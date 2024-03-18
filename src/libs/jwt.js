import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Usuario from "../models/usuarios.js";

config();

export const crearToken = (data, time = '1d') => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.sign(data, process.env.SECRET_KEY, { expiresIn: time }, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const verificarToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return reject(err);
        }
        let correo = decoded.correo
        const usuario = await Usuario.findOne({
          where:{correo}
        });
        
        if (!usuario) {
          return reject({message: 'Usuario no encontrado', usuario});
        }

        resolve({
          token,
          usuario: {
            id: usuario.id,
            username: usuario.username,
            correo: usuario.correo,
            telefono: usuario.telefono,
            estado: usuario.estado,
            rol: usuario.rol,
          },
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const verificarTokenRecupercion = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return reject(err);
        }
       
        resolve(decoded);
      });
    } catch (error) {
      reject(error);
    }
  });
};