import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import detalleFactura from "./detalleFactura.js";
import Usuario from "./usuarios.js";
import metodopago from "./metodopago.js";


const Factura = conexion.define('Factura',{
    // ID automatico
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    Total:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'Facturas',
    timestamps: true
})

Usuario.hasMany(Factura, { foreignKey: 'UsuarioId' })
Factura.belongsTo(Usuario)

detalleFactura.hasMany(Factura, { foreignKey: 'detalleFacturaId' })
Factura.belongsTo(detalleFactura)

metodopago.hasMany(Factura, { foreignKey: 'metodopagoId' })
Factura.belongsTo(metodopago)

export default Factura