import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AgregarProveedores.css";

function AgregarProveedores() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !phone || !address) {
        throw new Error("Llenar todos los campos es obligatorio.");
      }

      const response = await fetch("http://localhost:7000/proveedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          celular: phone,
          direccion: address,
        }),
      });

      if (response.ok) {
        toast.success("Proveedor registrado exitosamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/listaproveedores");
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => null);

        if (errorData && errorData.message) {
          throw new Error(`Error al registrar proveedor: ${errorData.message}`);
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

  return (
    <>
      <ToastContainer />
      <div className="proveedor-container">
        <div className="proveedor-box">
          <h1>Agregar Nuevo Proveedor</h1>
          <form>
            <div className="input-group-proveedor">
              <input
                type="text"
                name="name"
                placeholder="Ingrese el nombre del proveedor"
                required
                className="input-field-proveedor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group-proveedor">
              <input
                type="text"
                name="phone"
                placeholder="Ingrese el celular del proveedor"
                required
                className="input-field-proveedor"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-group-proveedor">
              <input
                type="text"
                name="address"
                placeholder="Ingrese la dirección del proveedor"
                required
                className="input-field-proveedor"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="container-buttons-agregar-proveedores">
              <button className="button-proveedor" onClick={() => navigate("/listaproveedores")}>
                Volver
              </button>
              <button className="button-proveedor" type="button" onClick={handleSubmit}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarProveedores;
