import Factura from "../models/Factura.js";
import detalleFactura from "../models/detalleFactura.js";
import metodopago from "../models/metodopago.js";

export const crearFactura = async (req, res) => {
  try {
    const consulta = await Factura.findOne({
      where:{
        detalleFacturaId: req.body.detalleFacturaId,
        metodopagoId: req.body.metodopagoId,
      },
    });
    if(consulta){
      return res.status(400).json({
          message: 'Ya se creo esa factura'
      })
  }
  const detallefac = await detalleFactura.findByPk(req.body.detalleFacturaId);
  const metodoFacstura = await metodopago.findByPk(req.body.metodopagoId);

  if (!detallefac || !metodoFacstura ) {
    return res.status(404).json({ message: 'Proceso de facturacion no procesado' });
  }

  const impuestoPorcentaje = 0.21;

  const operacion = (req.body.subtotal * impuestoPorcentaje)

  const total =  operacion;

  const crearFactura = await Factura.create({...req.body, total})
  
  const response = await crearFactura.save()

  res.status(201).json(response)
} catch (error) {
  res.status(500).json({message: error.message})
    }
  }

/* export const getFacturaByCodigo = async (req, res) => {
  try {
    const consultarfactura = await Factura.findAll({
      where: {
        codigo: { [Op.eq]: req.params.codigo },
      },
    });

    res.status(200).json(consultarfactura);
  } catch (error) {
    res.status(500).json(error);
  }
};
 */
/* export const getAllFactura = async (req, res) => {
  try {
    const consultarfactura = await Factura.findAll();

    res.status(200).json(consultarfactura);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const putFactura = async (req, res) => {
  try {
    const consultarProducto = await Factura.findByPk(req.params.id)

    if(!consultarProducto) {
        return res.status(404).json({
            message: 'producto no encontrado'
        })
    }
    
    if (req.body.UsuarioId) {
      const consultaUsuario = await Usuario.findByPk(req.body.UsuarioId);
      if (!consultaUsuario) {
        return res.status(404).json({
          message: "Usuario o producto no encontrado",
        });
      }
    }

    if (req.body.ProductoId) {
      const consultaProducto = await Producto.findByPk(req.body.ProductoId);
      if (!consultaProducto) {
        return res.status(404).json({
          message: "Usuario o producto no encontrado",
        });
      }
    }

    await consultarProducto.update(req.body)
    
    res.status(200).json({
        message: 'Factura actualizada'
    })
    
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export const deleteFactura = async (req, res) => {
  try {
    const consultarProducto = await Factura.findByPk(req.params.id)

    if(!consultarProducto) {
        return res.status(404).json({
            message: 'producto no encontrado'
        })
    }

    await consultarProducto.destroy()
    
    res.status(200).json({
        message: 'producto eliminado de la factura'
    })
    
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export const deleteAllFactura = async (req, res) => {
  try {
    const consultarfactura = await Factura.findAll({
      where: {
        codigo: { [Op.eq]: req.params.codigo },
      },
    });

    for (let registro of consultarfactura) {
      await registro.destroy()
    }

    res.status(200).json({
      message: 'Factura eliminada'
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
 */