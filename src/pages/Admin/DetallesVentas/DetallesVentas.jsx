import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import './DetallesVentas.css'
function DetallesVentas() {
  return (
    <div>
        <MenuLateral/>
        <div className="detalles-ventas">
        <div className="ventas-cards">
          <div className="left-venticas">
            <div className="icone-venticas">
              <Link>
                <FaRegEdit className="edit-icon-venticas" />
              </Link>
            </div>
            <div className="icond-venticas">
              <Link>
                <MdOutlineDeleteForever className="delete-icon-venticas" />
              </Link>
            </div>
          </div>


          <form className="ventas-form">
            <h1 className='titulo-ventas'>Venta #2</h1>
            <div className="grupo-ventas">
              <div className="campo-ventas">
                <label htmlFor="cliente">Cliente</label>
                <input className="venticas" type="text" id="cliente" name="cliente" />
              </div>
              <div className="campo-ventas">
                <label className='venticas-2' htmlFor="producto">Producto</label>
                <input className="venticas-2"type="text" id="producto" name="producto" />
              </div>
            </div>
            <div className="grupo-ventas">
              <div className="campo-ventas">
                <label htmlFor="informacion">Información</label>
                <input className="venticas" type="text" id="informacion" name="informacion" />
              </div>
              <div className="campo-ventas">
                <label className='venticas-2' htmlFor="monto">Monto Total</label>
                <input  className="venticas-2" type="text" id="monto" name="monto" />
              </div>
            </div>
            <div className='boton-ventas'>
            <button className='boton-venticas'><Link to="/listaventas">Volver a Ventas</Link></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DetallesVentas