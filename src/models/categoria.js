import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Categoria = conexion.define('Categoria',{
    // ID en automatico
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    tableName: 'Categorias',
    timestamps:false
})

export default Categoria