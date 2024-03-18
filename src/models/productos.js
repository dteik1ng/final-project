import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Categoria from "./categoria.js";
import Proveedor from "./proveedores.js";



const Producto = conexion.define("Producto", {
  // Insertar el ID desde el formulario
  id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image:{
    type: DataTypes.STRING,
    allowNull:true
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cantidadEntrada: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fechaEntrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    tableName: 'Productos',
    timestamps: true
})

Categoria.hasMany(Producto, { foreignKey: 'CategoriaId' })
Producto.belongsTo(Categoria, { foreignKey: 'CategoriaId' })

Proveedor.hasMany(Producto, { foreignKey : 'ProveedorId'})
Producto.belongsTo(Proveedor, { foreignKey: 'CategoriaId' })



export default Producto
