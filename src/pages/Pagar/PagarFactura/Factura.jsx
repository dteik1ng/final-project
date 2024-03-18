import { useState } from 'react';
import './Factura.css'
import Navbar from '../../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Factura = () => {
    const [facturaInfo, setFacturaInfo] = useState({
        fechaEmision: '10/03/2024',
        direccion: 'Calle 123',
        nombreDestinatario: 'Mariana',
        metodoPago: 'Tarjeta de Credito',
        estado: 'Pago',
        productos: [],
    });

    const handleDescargarFactura = () => {
        //   la logica
    };

    return (

        <>
            <Navbar />
            <div className="factura">
                <h1 className="titulo">Factura</h1>
                <hr />
                <div className="informacion">
                    <p>Fecha de Emisión: {facturaInfo.fechaEmision}</p>
                    <p>Dirección: {facturaInfo.direccion}</p>
                    <p>Nombre Destinatario: {facturaInfo.nombreDestinatario}</p>
                    <p>Método de Pago: {facturaInfo.metodoPago}</p>
                    <p>Estado: {facturaInfo.estado}</p>
                </div>
                <hr />
                <div className="productos">
                    {/* Aquí puedes mapear los productos y mostrar la información */}
                </div>
                <hr />
                <div className="total">
                    <p>Total: {/* Aquí calcula el total de los productos */}</p>
                </div>
                <button onClick={handleDescargarFactura}>Descargar Factura</button>
                <Link to="/" >
                    <button className='facturita'>Salir</button>
                </Link>
            </div>
        </>
    );
};

export default Factura;