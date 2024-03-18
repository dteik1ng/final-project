import { useState } from 'react'; // Importa el hook useState
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Contacto.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { TbClockHour6 } from "react-icons/tb";
import { Link } from 'react-router-dom';

function ContactoPage() {
  const [/* formularioEnviado, */ setFormularioEnviado] = useState(false); 
  const [datosFormulario, setDatosFormulario] = useState({
    name: '',
    email: '',
    message: ''
  }); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
   
    // Muestra la alerta de formulario enviado
    alert('¡Formulario enviado!');
    setFormularioEnviado(true);
   
    setDatosFormulario({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container-contacto">
     
      <div className="contact-form">
        <h2>Contacta con nosotros</h2>
        <p>Siéntase libre de contactarnos en cualquier momento.
           Nos comunicaremos con usted tan pronto como podamos.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={datosFormulario.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={datosFormulario.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="2" value={datosFormulario.message} onChange={handleChange}></textarea>
          </div>
          <button className="boton-contacto" type="submit">Enviar</button>
        </form>
        <div className="info-container-contacto">
          <h3>Información</h3>
          <ul>
            <li><Link to="mailto:barrelglow@gmail.com"><MdOutlineMailOutline className="icono-correo" />barrelglow@gmail.com</Link></li>
            <li><Link to="tel:+6041234567"><FiPhone className="icono-telefono"/> +604 1234567</Link></li>
            <li><TbClockHour6 className="icono-hora"/>7:00 AM - 5:00 PM</li>
          </ul>
        </div>
      </div>
      
    </div>
      <Footer />
    </>
  );
}

export default ContactoPage;
