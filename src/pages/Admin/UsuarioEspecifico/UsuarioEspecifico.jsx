import { Link } from "react-router-dom";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
import '../UsuarioEspecifico/UsuarioEspecifico.css'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

function UsuarioEspecifico() {
  return (
    <div>
      <MenuLateral />

      <div className="edit-user-especifico">
        <div className="edit-card-especifico">
          <div className="left-user-especifico">
            <div className="icone-especifico">
              <Link>
                <FaRegEdit className="edit-icon-especifico" />
              </Link>
            </div>
            <div className="icond-especifico">
              <Link>
                <MdOutlineDeleteForever className="delete-icon-especifico" />
              </Link>
            </div>
          </div>
          <form className="especifico">
          <h1 className='titulo-user'>Juanito Rodriguez</h1>
            <div className="grupo-campos-user">
              <div className="campo-user">
                <label htmlFor="username">Username</label>
                <input  className="userp"type="text" id="username" name="username" />
              </div>
              <div className="campo-user">
                <label className="usuario" htmlFor="correo">Correo</label>
                <input className="usuario" type="email" id="correo" name="correo" />
              </div>
            </div>
            <div className="grupo-campos-user">
              <div className="campo-user">
                <label htmlFor="telefono">Teléfono</label>
                <input  className="userp" type="text" id="telefono" name="telefono" />
              </div>
              <div className="campo-user">
                <label className="usuario" htmlFor="estado">Estado</label>
                <input className="usuario" type="text" id="estado" name="estado" />
              </div>
            </div>
            <div className="campo-user">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" />
            </div>
            <div className="campo-user">
              <label htmlFor="rol">Rol</label>
              <input type="text" id="rol" name="rol" />
            </div>
          </form>

          <div className="right-user">

          </div>
        </div>
      </div>
    </div>

  );
}

export default UsuarioEspecifico;
