import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Factura from '../models/Factura.js'

const Historial = conexion.define('Historial',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey:true,
        autoIncrement: true
    },
})

Factura.hasMany(Historial,{foreignKey:'FacturaId'})
Historial.belongsTo(Factura)

export default Historial