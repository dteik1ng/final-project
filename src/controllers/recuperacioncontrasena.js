import { enviarEmail } from "../libs/nodemailer.js";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuarios.js";
import { crearToken, verificarTokenRecupercion } from "../libs/jwt.js";

export const validarEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@gmail.com$/.test(email);
};

export const postCrearCodigo = async (req, res) => {
  try {
    const { correo } = req.body;

    const encontrarUser = await Usuario.findOne({
      where: { correo },
    });

    if (!encontrarUser) {
      return res.status(400).json({
        ok: false,
        message: "El correo electrónico no está registrado en nuestra base de datos",
      });
    }

    if (!validarEmail(correo)) {
      return res.status(400).json({
        ok: false,
        message: "Correo inválido, solo se aceptan correos de gmail",
      });
    }

    const generarCodigoAleatorio = () => {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let codigo = "";
      for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
      }
      return codigo;
    };

    const dataToken = generarCodigoAleatorio();

    const messageEmail = `Recuperación de cuenta.\n \n \t \t Este es tu código de Recuperacion:  ${dataToken} \n \n Si tienes problemas con el código de recuperación puedes intentar nuevamente. \n Continua sin funcionar, puedes contactar con el administrador.`;

    await enviarEmail(messageEmail, correo, "Mariana es un buñuelo");
    var salt = bcrypt.genSaltSync(10);
    const tokenEntrypt = bcrypt.hashSync(dataToken, salt);

    res.cookie("recuperacion", tokenEntrypt)
    .status(200).json({
      message: "Revisa tu correo, recuperación enviada exitoso",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const postValidarCodigo = async (req, res) => {
  try {
    const { token } = req.body;
    const { recuperacion } = req.cookies;

    const isMatch = await bcrypt.compare(token, recuperacion);

    if (!isMatch) {
      return res.status(400).json({
        ok: false,
        message: "Código inválido",
      });
    }

    // Crear Cookie
    const generateCookie = await crearToken({ isMatch }, "1h");

    res
      .cookie("cambiopass", generateCookie,{
        expiresIn: '1h'
      })
      .status(200)
      .json({
        ok: true,
        message: "insertar nueva contraseña",
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { cambiopass } = req.cookies;
    const { password, correo } = req.body;

    if (!cambiopass) {
      return res.status(400).json({
        message: "Tiempo expirado, intenta de nuevo",
      });
    }
    let valueToken = cambiopass;

    if (!correo) {
      return res.status(400).json({
        message: "Correo obligatorio",
      });
    }

    await verificarTokenRecupercion(valueToken);
     var salt = bcrypt.genSaltSync(10);
     const passwordHast = bcrypt.hashSync(password, salt);

    const actualizarUsuario = await Usuario.findOne({
      where: { correo: correo }
    });

    await actualizarUsuario.update({ password: passwordHast });

    res.cookie("cambiopass", "", {  
      expires: new Date(0),
    }).json({
      message: "usuario actualizado",
    }).status(200);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
