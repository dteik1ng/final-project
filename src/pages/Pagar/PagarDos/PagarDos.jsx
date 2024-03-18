import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Banner from '../../../components/Banner(Pagar)/Banner';
import '../PagarDos/PagarDos.css';
import Resumen from '../../../components/Resumen/Resumen';

function PagarDos() {
    const navigate = useNavigate();

    const [banco, setBanco] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [titularTarjeta, setTitularTarjeta] = useState('');
    const [cvv, setCvv] = useState('');
    const [cuotas, setCuotas] = useState('');
    const [mesVencimiento, setMesVencimiento] = useState('');
    const [anioVencimiento, setAnioVencimiento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', {
            banco,
            numeroTarjeta,
            titularTarjeta,
            cvv,
            cuotas,
            mesVencimiento,
            anioVencimiento,
        });
    };

    const handleSaveAndContinue = () => {
        const formValues = [banco, numeroTarjeta, titularTarjeta, cvv, cuotas, mesVencimiento, anioVencimiento];
        const allFieldsFilled = formValues.every(value => value.trim() !== '');

        if (allFieldsFilled) {
            navigate('/pagartres');
        } else {
            navigate('/pagardos');
        }
    };

    return (
        <>
            <Navbar />
            <Banner />

            <div className="formulario-pago">
                <form className="formulario-pagos" onSubmit={handleSubmit}>
                    <Link to="/pagaruno">
                        <button className='boton-pago2'>- Volver</button>
                    </Link>
                    <h1>Datos Bancarios</h1>
                    <label className='numero-tarjeta'>
                        Banco
                        <input className='banco' type="text" value={banco} onChange={(e) => setBanco(e.target.value)} />
                    </label>

                    <label className='numero-tarjeta'>
                        Número de Tarjeta
                        <input className="banco" type="text" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
                    </label>

                    <div className='inline-fields'>
                        <label className='numero-tarjeta'>
                            Titular
                            <input className='bancos' type="text" value={titularTarjeta} onChange={(e) => setTitularTarjeta(e.target.value)} />
                        </label>
                        <label className='numero-tarjeta'>
                            CVV
                            <input className='bancos2' type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                        </label>

                        <label className='numero-tarjeta'>
                            Cuotas
                            <input className='bancos2' type="text" value={cuotas} onChange={(e) => setCuotas(e.target.value)} />
                        </label>
                    </div>


                    <div className='numero-tarjetas'>
                        <label className='numero-tarjeta'>
                            Vencimiento
                        </label>
                        <div className='vencimiento-container'>
                            <div className='vencimiento1'>
                                <input className='vencimiento' type="text" placeholder="Mes" value={mesVencimiento} onChange={(e) => setMesVencimiento(e.target.value)} />
                            </div>
                        </div>
                        <div className='vencimiento2'>
                            <input className='vencimiento' type="text" placeholder="Año" value={anioVencimiento} onChange={(e) => setAnioVencimiento(e.target.value)} />
                        </div>

                    </div>


                    <div className="form-grupo">
                        <button className='boton-pagar' type="submit" onClick={handleSaveAndContinue}>Pagar</button>
                    </div>

                </form>


            </div>
            <Resumen />
        </>
    );
}


export default PagarDos;