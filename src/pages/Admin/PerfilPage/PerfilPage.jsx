import { useState, useEffect } from "react";
import "./PerfilPage.css";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

function PerfilPage() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/usuarios")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const user = data[i];
          if (user.correo === localStorage.getItem("correo")) {
            setUsuarioLogeado(user);
            localStorage.setItem("rolUser", user.RolId);
            break;
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
      });
  }, []);

  if (!usuarioLogeado) {
    return <div>Error: No se encontraron datos del usuario.</div>;
  }

  const getRolName = (RolId) => {
    if (RolId === 1) {
      return "Admin";
    } else if (RolId === 2) {
      return "User";
    }
    return "";
  };

  const { nombre, correo, celular } = usuarioLogeado;

  return (
    <>
      <MenuLateral />

      <div className="edit-user">
        <div className="edit-card">
          <div className="left-user">
            <div className="icone-wrapper">
              <Link>
                <FaRegEdit className="edit-icon" />
              </Link>
            </div>
            <div className="icond-wrapper">
              <Link>
                <MdOutlineDeleteForever className="delete-icon" />
              </Link>
            </div>
          </div>

          <form className="perfil-form">
            <h1 className="titulo-perfil">{nombre}</h1>
            <div className="grupo-perfil">
              <div className="campo-perfil">
                <label htmlFor="username">Username</label>
                <p id="username" className="chiquito">
                  {nombre}
                </p>
              </div>
              <div className="campo-perfil">
                <label className="chiquito-2" htmlFor="correo">
                  Correo
                </label>
                <p id="correo" className="chiquito-2">
                  {correo}
                </p>
              </div>
            </div>
            <div className="grupo-perfil">
              <div className="campo-perfil">
                <label htmlFor="telefono">Celular</label>
                <p id="telefono" className="chiquito">
                  {celular}
                </p>
              </div>
              <div className="campo-perfil">
                <label className="chiquito-2" htmlFor="estado">
                  Estado
                </label>
                <p id="estado" className="chiquito-2">
                  Activo
                </p>
              </div>
            </div>
            <div className="campo-perfil">
              <label htmlFor="rol">Rol</label>
              <p id="rol" className="rol">
                {getRolName(usuarioLogeado.RolId)}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;
