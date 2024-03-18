import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Banner from "../../../components/Banner(Pagar)/Banner";
import "./PagarTres.css";
import { Link } from "react-router-dom";
import Resumen from "../../../components/Resumen/Resumen";

const PagarTres = () => {
  const [banco, setBanco] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [titular, setTitular] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cc, setCc] = useState("");
  const [cuotas, setCuotas] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      banco,
      numeroTarjeta,
      titular,
      telefono,
      direccion,
      cc,
      cuotas,
    });
  };

  return (
    <>
      <Navbar />
      <Banner />
      <div className="formulario-pagar-tres">
        <form className="pagar-tres" onSubmit={handleSubmit}>
          <Link to="/pagardos">
            <button className="boton-pagar-boton">- Volver</button>
          </Link>
          <h1>Datos de la Compra</h1>
          <label className="banquito" htmlFor="banco">
            Banco
          </label>
          <input
            readOnly
            className="pago-tres"
            type="text"
            id="banco"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
          />

          <label className="banquito" htmlFor="numeroTarjeta">
            Número de Tarjeta
          </label>
          <input
            readOnly
            className="pago-tres"
            type="text"
            id="numeroTarjeta"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
          />

          <label className="banquito" htmlFor="titular">
            Titular
          </label>
          <input
            readOnly
            className="pago-tres"
            type="text"
            id="titular"
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
          />

          <label className="banquito" htmlFor="telefono">
            Teléfono Celular
          </label>
          <input
            readOnly
            className="pago-tres"
            type="text"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <label className="banquito" htmlFor="direccion">
            Dirección
          </label>
          <input
            readOnly
            className="pago-tres"
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <div className="mas-informacion-pago-tres">
            <label className="banquito" htmlFor="cc">
              CC
            </label>
            <input
              readOnly
              className="tercerpago"
              type="text"
              id="cc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />

            <label className="banquito" htmlFor="cuotas">
              Cuotas
            </label>
            <input
              readOnly
              className="tercerpago"
              type="text"
              id="cuotas"
              value={cuotas}
              onChange={(e) => setCuotas(e.target.value)}
            />
          </div>
          <Link to="/factura">
            <button className="confirmar-compra" type="submit">
              Confirmar Compra
            </button>
          </Link>
        </form>
      </div>
      <Resumen />
    </>
  );
};

export default PagarTres;
