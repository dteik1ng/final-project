import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Producto from "./productos.js";

const detalleFactura = conexion.define("detalleFactura", {
    // Insertar el ID desde el formulario
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "detalleFactura",
    timestamps: true,
  }
);

Producto.hasMany(detalleFactura, { foreignKey : 'ProductoId'})
detalleFactura.belongsTo(Producto)

export default detalleFactura;
