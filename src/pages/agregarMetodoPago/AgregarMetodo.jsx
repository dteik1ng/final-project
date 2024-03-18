import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./AgregarMetodo.css";

function Register() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);

  const [name, setName] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        throw new Error("El nombre del metodo de pago es requerido.");
      }
      ///
       console.log("Datos a enviar:", {
         nombre: name,
        
       });
      const response = await fetch("http://localhost:7000/metodopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
        }),
      });
      if (response.ok) {
        toast.success("Metodo de pago registrado exitosamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/listametodopago"); // Redirecciona a la lista de usuarios
      } else if (response.status === 400) {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.message) {
          if (errorData.message.toLowerCase().includes("obligatorio")) {
            throw new Error(errorData.message);
          } else if (errorData.message.toLowerCase().includes("correo electrónico ya está registrado")) {
            throw new Error("El correo electrónico ya está registrado. Utiliza otro correo.");
          } else {
            throw new Error(`Error al registrar usuario: ${errorData.message}`);
          }
        }
      } else {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.message) {
          throw new Error(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClose = () => {
    setShowForm(false);
    navigate("/listaMetodoPago");
  };

  return (
    <>
      {showForm && (
        <div className="form-container">
          <ToastContainer />
          <form className="form-metodo" id="formulario">
            <button className="cerrar-form-metodo" onClick={handleClose}>
              X
            </button>{" "}
            {/* Botón de cierre */}
            <h3>Agregar Metodo de pago</h3>
            <div className="form-row-metodo">
              <div className="metodo-group col ">
                <label className="form-label-metodo">
                  <span className="form-label-text">Nombre</span>
                </label>
                <input
                  className="form-control-metodo"
                  placeholder="Ingrese su nombre"
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div> 
              </div>
            <button
              type="button"
              className="button-guardar-metodo"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;