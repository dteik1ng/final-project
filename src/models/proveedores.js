import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Proveedor = conexion.define('Proveedor',{
    // Insertar el ID desde el formulario
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:false,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    celular: {
        type: DataTypes.STRING,
        allowNull:false
    },
},{
    tableName: 'Proveedores',
    timestamps:false
})

export default Proveedor