import { Op } from "sequelize";
import Producto from "../models/productos.js";
import Categoria from "../models/categoria.js";
import Proveedor from "../models/proveedores.js";
import { productoSchema } from "../schemas/productoschemas.js";
import sharp from "sharp";
import {
  maxBytes,
  tiposPermitidos,
  validateSchemaInto,
  crearNombreRecurso,
  deleteFile,
} from "../variables.js";
import fs from "fs";

export const crearProduto = async (req, res) => {
  try {
    let bufferComprimido;
    let urlPath;
    let datosProducto;
    let bodyBuild = {
      ...req.body,
    };

    if (bodyBuild.id) {
      bodyBuild = {
        ...bodyBuild,
        id: parseInt(bodyBuild.id),
      };
    }

    if (bodyBuild.precio) {
      bodyBuild = {
        ...bodyBuild,
        precio: parseInt(bodyBuild.precio),
      };
    }

    if (bodyBuild.cantidadEntrada) {
      bodyBuild = {
        ...bodyBuild,
        cantidadEntrada: parseInt(bodyBuild.cantidadEntrada),
      };
    }

    if (bodyBuild.cantidad) {
      bodyBuild = {
        ...bodyBuild,
        cantidad: parseInt(bodyBuild.cantidad),
      };
    }

    if (bodyBuild.CategoriaId) {
      bodyBuild = {
        ...bodyBuild,
        CategoriaId: parseInt(bodyBuild.CategoriaId),
      };
    }

    if (bodyBuild.ProveedorId) {
      bodyBuild = {
        ...bodyBuild,
        ProveedorId: parseInt(bodyBuild.ProveedorId),
      };
    }

    const validarBody = validateSchemaInto(productoSchema, bodyBuild);
    if (validarBody.issues) {
      return res.status(400).json(validarBody);
    }

    const consulta = await Producto.findOne({
      where: {
        [Op.or]: {
          id: bodyBuild.id,
          nombre: bodyBuild.nombre,
        },
      },
    });

    const consultaProveedor = await Proveedor.findByPk(bodyBuild.ProveedorId);
    const consultarCategoria = await Categoria.findByPk(bodyBuild.CategoriaId);

    if (!consultarCategoria || !consultaProveedor) {
      return res.status(400).json({
        message: "La categoria o proveedor no existen",
      });
    }

    if (consulta) {
      return res.status(400).json({
        message: "El código o nombre de producto ya existen",
      });
    }

    let image = req.file;
    if (image) {
      // validar tipo de dato
      if (!tiposPermitidos.includes(image.mimetype)) {
        return res.status(400).json({
          ok: false,
          message: `Formato ${
            image.mimetype.split("/")[1]
          } inválido. [png, jpg, jpeg]`,
        });
      }

      // Peso de la imagen
      if (image.size > maxBytes) {
        return res.status(400).json({
          message: "La imagen es muy grande. (Máx 10MB)",
        });
      }

      // Asignar buffer o datos de la imagen
      const buffer = Buffer.from(image.buffer, "binary");

      const nombreImagen = crearNombreRecurso(image);

      // intanciar imagen para manipularla mejor
      let proccesImage = sharp(buffer);

      const ancho = proccesImage.width;
      const alto = proccesImage.height;

      // redimencionar imagen
      if (ancho > 1024 || alto > 1024) {
        const escala = Math.min(1, 1024 / ancho, 1024 / alto);
        proccesImage = proccesImage.grayscale(escala);
      }

      // Buffer con datos de imagen ya procesados.
      bufferComprimido = await proccesImage.toBuffer(nombreImagen.mimetype);

      // url para guardar imagenes
      urlPath = `src/upload/${nombreImagen.nombre}`;
      datosProducto = {
        ...bodyBuild,
        image: nombreImagen.nombre,
      };
    } else {
      return res.status(400).json({ error: "imagen es requerida" });
    }

    const crearProducto = await Producto.create(datosProducto);

    const response = await crearProducto.save();

    fs.writeFileSync(urlPath, bufferComprimido);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const putProducto = async (req, res) => {
  try {
    let bufferComprimido;
    let urlPath;
    let datosProducto;
    let bodyBuild = {
      ...req.body,
    };

    if (bodyBuild.id) {
      bodyBuild = {
        ...bodyBuild,
        id: parseInt(bodyBuild.id),
      };
    }

    if (bodyBuild.precio) {
      bodyBuild = {
        ...bodyBuild,
        precio: parseInt(bodyBuild.precio),
      };
    }

    if (bodyBuild.cantidadEntrada) {
      bodyBuild = {
        ...bodyBuild,
        cantidadEntrada: parseInt(bodyBuild.cantidadEntrada),
      };
    }

    if (bodyBuild.cantidad) {
      bodyBuild = {
        ...bodyBuild,
        cantidad: parseInt(bodyBuild.cantidad),
      };
    }

    if (bodyBuild.CategoriaId) {
      bodyBuild = {
        ...bodyBuild,
        CategoriaId: parseInt(bodyBuild.CategoriaId),
      };
    }

    if (bodyBuild.ProveedorId) {
      bodyBuild = {
        ...bodyBuild,
        ProveedorId: parseInt(bodyBuild.ProveedorId),
      };
    }

    const validarBody = validateSchemaInto(productoSchema, bodyBuild);
    if (validarBody.issues) {
      return res.status(400).json(validarBody);
    }

    const consultarProducto = await Producto.findByPk(req.params.id);

    if (!consultarProducto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const consultaProveedor = await Proveedor.findByPk(bodyBuild.ProveedorId);
    const consultarCategoria = await Categoria.findByPk(bodyBuild.CategoriaId);

    if (!consultarCategoria || !consultaProveedor) {
      return res.status(400).json({
        message: "La categoria o proveedor no existen",
      });
    }

    let image = req.file;
    if (image) {
      // validar tipo de dato
      if (!tiposPermitidos.includes(image.mimetype)) {
        return res.status(400).json({
          ok: false,
          message: `Formato ${
            image.mimetype.split("/")[1]
          } inválido. [png, jpg, jpeg]`,
        });
      }

      // Peso de la imagen
      if (image.size > maxBytes) {
        return res.status(400).json({
          message: "La imagen es muy grande. (Máx 10MB)",
        });
      }

      // Asignar buffer o datos de la imagen
      const buffer = Buffer.from(image.buffer, "binary");

      const nombreImagen = crearNombreRecurso(image);

      // intanciar imagen para manipularla mejor
      let proccesImage = sharp(buffer);

      const ancho = proccesImage.width;
      const alto = proccesImage.height;

      // redimencionar imagen
      if (ancho > 1024 || alto > 1024) {
        const escala = Math.min(1, 1024 / ancho, 1024 / alto);
        proccesImage = proccesImage.grayscale(escala);
      }

      // Buffer con datos de imagen ya procesados.
      bufferComprimido = await proccesImage.toBuffer(nombreImagen.mimetype);

      // url para guardar imagenes
      urlPath = `src/upload/${nombreImagen.nombre}`;
      datosProducto = {
        ...bodyBuild,
        image: nombreImagen.nombre,
      };

      if (consultarProducto.image) {
        if (deleteFile(consultarProducto.image)) {
          res.status(500).json({
            message: "Error al remplazar la imagen",
          });
        }
      }
    }

    await consultarProducto.update(datosProducto);

    fs.writeFileSync(urlPath, bufferComprimido);

    return res.status(200).json({
      message: "producto actualizado",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducto = async (req, res) => {
  try {
    const consultarProducto = await Producto.findAll();

    res.status(200).json(consultarProducto);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProducto = async (req, res) => {
  try {
    const consultarProducto = await Producto.findByPk(req.params.id);

    if (!consultarProducto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(consultarProducto);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deletetProducto = async (req, res) => {
  try {
    const consultarProducto = await Producto.findByPk(req.params.id);

    if (!consultarProducto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    if (consultarProducto.image) {
      if (deleteFile(consultarProducto.image)) {
        return res.status(500).json({
          message: "Error al remplazar la imagen",
        });
      }
    }

    await consultarProducto.destroy();

    res.status(200).json({
      message: "producto eliminado",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
