import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Banner from '../../../components/Banner(Pagar)/Banner';
import Navbar from '../../../components/Navbar/Navbar';
import '../PagarUno/PagarUno.css';
import Resumen from '../../../components/Resumen/Resumen';

function PagarUno() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        codigo_postal: '',
        direccion: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveAndContinue = () => {
        const formValues = Object.values(formData);
        const allFieldsFilled = formValues.every(value => value !== '');

        if (allFieldsFilled) {
            navigate('/pagardos');
        } else {
            navigate('/pagaruno');
        }
    };

    return (
        <>
            <Navbar />
            <Banner />

            <div className="pagar-container">
                <div className="pagar-left">
                    <Link to="/carritoCompras">
                        <button className='boton-pagar'>- Volver</button>
                    </Link>
                    <h1 className='pagar-titulo'>Datos personales</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input
                                placeholder='Ingresa tu nombre completo'
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                placeholder='Ingresa tu correo electrónico'
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono Celular</label>
                            <input
                                placeholder='Ingresa tu celular'
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="codigo_postal">Código Postal</label>
                            <input
                                placeholder='Ingresa tu código postal'
                                type="text"
                                id="codigo_postal"
                                name="codigo_postal"
                                value={formData.codigo_postal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección | Barrio | Ciudad</label>
                            <input
                                placeholder='Ingresa tu dirección'
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={handleSaveAndContinue} type='submit'>Guardar y continuar</button>
                        </div>
                    </form>
                </div>

                <Resumen />

            </div>
        </>

    );
}

export default PagarUno;
