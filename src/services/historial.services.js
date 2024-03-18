import Factura from "../models/Factura.js";
import Historial from "../models/Historial.js";
import t from "../helpers/transacciones.js";

export const postHistorialService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exiteFactura = await Factura.findById(data.FacturaId);

      if (!exiteFactura) {
        return resolve({
          ok: false,
          message: "No existe la factura",
        });
      }


      /* esto es la transaccion */

      let transaccion = await t.create();

      if (!transaccion.ok) {
        throw new Error("Error al crear la transaccion");
      }

      const generalRegistro = await Historial.create(data, {
        transction: transaccion.data,
      });
      const response = await generalRegistro.save();

      if (!response) {
        await t.rollback(transaccion.data);
        return resolve({
          ok: false,
          message: "No se pudo crear el registro",
        });
      }
      await t.commit(transaccion.data);
      resolve({
        ok: true,
        message: "Registro creado",
      });
    } catch (error) {
      reject(error);
    }
  });
};


export const getAllHistorialService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const registros = await Historial.findAll();

      resolve({
        ok: true,
        message: "Lista de historial",
        data: registros,
      });
    } catch (error) {
      reject(error);
    }
  });
};


export const getHistorialService = (idHistorial) => {
  return new Promise(async (resolve, reject) => {
    try {
      const registro = await Historial.findById(idHistorial);

      if (!registro) {
        return resolve({
          ok: false,
          message: "No existe el registro",
        });
      }

      resolve({
        ok: true,
        message: "Registro encontrado",
        data: registro,
      });
    } catch (error) {
      reject(error);
    }
  });
};


export const deleteHistorialService = (idHistorial) => {
  return new Promise(async (resolve, reject) => {
    try {
      const eliminarHistorial = await Historial.findById(idHistorial);

      if (!eliminarHistorial) {
        return resolve({
          ok: false,
          message: "No existe el registro",
        });
      }

      await eliminarHistorial.destroy();

      resolve({
        ok: true,
        message: "Registro eliminado",
      });
    } catch (error) {
      reject(error);
    }
  });
};