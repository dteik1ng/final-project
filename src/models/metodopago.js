import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const metodopago = conexion.define('metodopago',{
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
    tableName: 'metodopago',
    timestamps:false
})

export default metodopago