import { verificarToken } from "../libs/jwt.js";

export const rutaProtegida = async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"];
    if (!accessToken) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const token = accessToken.split(" ")[1];

    const data = await verificarToken(token);
    req.usuario = data;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
