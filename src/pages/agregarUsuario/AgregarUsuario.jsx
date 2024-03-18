import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AgregarUsuario.css";
import { Link } from "react-router-dom";

function AgregarUsuario() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!name || !lastName || !email || !phone || !password || !address) {
        throw new Error("Llenar todos los campos es obligatorio.");
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Ingresa una dirección de correo electrónico válida.");
      }
  
      const response = await fetch("http://localhost:7000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          apellido: lastName,
          correo: email,
          celular: phone,
          password: password,
          direccion: address,
        }),
      });
  
      if (response.ok) {
        toast.success("Usuario registrado exitosamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        setTimeout(() => {
          navigate("/listausuarios");
        }, 2000);
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

  return (
    <>
      <ToastContainer />
      <div className="usuario-container">
        <div className="usuario-box">
          <h1>Agregar Nuevo Usuario</h1>
          <form>
            <div className="input-group-usuario">
              <input
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                required
                className="input-field-usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group-usuario">
              <input
                type="text"
                name="lastName"
                placeholder="Ingresa tu apellido"
                required
                className="input-field-usuario"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-group-usuario">
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu email"
                required
                className="input-field-usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group-usuario">
              <input
                type="text"
                name="phone"
                placeholder="Ingresa tu teléfono"
                required
                className="input-field-usuario"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-group-usuario">
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
                className="input-field-usuario"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group-usuario">
              <input
                type="text"
                name="address"
                placeholder="Ingresa tu dirección"
                required
                className="input-field-usuario"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="container-buttons-agregar-users">
            <button className="button-usuario"><Link to="/listaUsuarios">Volver</Link></button>
            
            <button className="button-usuario" type="button" onClick={handleSubmit}>
              Enviar
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarUsuario;
