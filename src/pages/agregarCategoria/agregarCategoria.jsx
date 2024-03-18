import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./agregarCategoria.css";
import { Link } from "react-router-dom";

function AgregarCategoria() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!nombre) {
        throw new Error("El nombre es obligatorio.");
      }

      const response = await fetch("http://localhost:7000/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
        }),
      });

      if (response.ok) {
        toast.success("Categoría agregada exitosamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/listacategoria");
        }, 2000);
      } else if (response.status === 400) {
        const errorData = await response.json().catch(() => null);

        if (errorData && errorData.message) {
          if (errorData.message.toLowerCase().includes("obligatorio")) {
            throw new Error(errorData.message);
          } else {
            throw new Error(`Error al agregar categoría: ${errorData.message}`);
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
      <div className="categoria-container">
        <div className="form-categoria">
          <h1>Agregar Nueva Categoría</h1>
          <form>
            <div className="form-row-categoria">
              <div className="categoria-group">
                <label className="form-label-text">Nombre de la categoría:</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ingresa el nombre de la categoría"
                  required
                  className="form-control-categoria"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
            <div className="container-buttons-agregar-categorias">
              <div className="container-button-categoria">
              <button className="button-guardar-categoria">
                <Link to="/listacategoria">Volver</Link>
              </button>
              <button className="button-guardar-categoria" type="button" onClick={handleSubmit}>
                Enviar
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarCategoria;
