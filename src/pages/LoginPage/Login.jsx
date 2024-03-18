import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Lenar todos los campos es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    localStorage.setItem("correo", email);

    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, role } = responseData;

        localStorage.setItem("token", token);

        if (role === "ADMIN") {
          toast.success("Inicio de sesión exitoso.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/perfilpage");
          }, 2000);
        } else if (role === "USUARIO") {
          toast.success("Inicio de sesión exitoso.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        toast.error("Credenciales Inválidas.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`Error de red: ${error.message}`, {
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
      <Navbar />
      <ToastContainer />
      <div className="login-container">
        <div className="login-box">
          <h1>Inicia Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group-login">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Ingresa tu email"
                className="input-field-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group-login">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Ingresa tu contraseña"
                className="input-field-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="button-login"
              type="button"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </form>
{/*           <p className="text-login">
            <Link to="/contraseña">¿Olvidaste tu contraseña?</Link>
          </p> */}
          <p className="text-login">
            ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
