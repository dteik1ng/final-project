import detalleFactura from "../models/detalleFactura.js";
import Producto from "../models/productos.js";
/* import { Op } from "sequelize"; */

export const creardetalleFactura = async (req, res) => {
  try {
    const consulta = await detalleFactura.findOne({
      where:{
          ProductoId: req.body.ProductoId,
      },
    });
    if(consulta){
      return res.status(400).json({
          message: 'El producto ya esta en el carrito'
      })
  }
  const productoExistente = await Producto.findByPk(req.body.ProductoId);
  if (!productoExistente) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  const subtotal = (req.body.cantidad * productoExistente.precio)

  const creardetalleFactura = await detalleFactura.create({...req.body, subtotal})
  
  const response = await creardetalleFactura.save()

  res.status(201).json(response)
} catch (error) {
  res.status(500).json({message: error.message})
    }
  }
export const getAllDetalleFactura = async(req,res)=>{
  try {
      const consultardetalleFactura = await detalleFactura.findAll()
  
      res.status(200).json(consultardetalleFactura)
   } catch (error) {
      res.status(500).json(error.message)
   }
}
export const getDetalleFactura = async (req, res ) =>{
  try {
      const consultardetalleFactura = await Producto.findByPk(req.params.id)

      if (!consultardetalleFactura) {
          return res.status(404).json({
              message: 'Sin detalle de factura'
          })
      }

      res.status(200).json(consultardetalleFactura)
  } catch (error) {
      res.status(500).json(error.message)
  }
}

export const putDetalleFactura = async (req, res) => {
  try {
      const consultardetalleFactura = await detalleFactura.findByPk(req.params.id)

      if (!consultardetalleFactura) {
          return res.status(404).json({
              message: 'Detalle de factura no encontrado'
          })
      }

      await  consultardetalleFactura.update(req.body)

      res.status(200).json({
          message: 'Cantidad modificada'
      })
  } catch (error) {
      res.status(500).json(error.message)
  }
}

export const deleteDetalleFactura = async (req, res) => {
  try {
      const consultardetalleFactura = await detalleFactura.findByPk(req.params.id)

      if (!consultardetalleFactura) {
          return res.status(404).json({
              message: 'Detalle de factura no encontrado'
          })
      }

      await  consultardetalleFactura.destroy()

      res.status(200).json({
          message: 'producto eliminado'
      })
  } catch (error) {
      res.status(500).json(error.message)
  }
} 