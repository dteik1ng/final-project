import MenuLateral from '../../../components/Admin/MenuLateral/MenuLateral'
import './ProductoDetalle.css'
import { FaRegEdit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import Barril from '../../../assets/img/Barriles.jpg'
function ProductoDetalle() {
  return (
    <div>
      <MenuLateral />
      <div className="Product-detalle">
        <div className="detalle-producto">
          <div className="left-detalle">
            <div className="icon-detalle">
              <Link to="/imagendetalle">
                < CiImageOn className="img-icon-detalle" />
              </Link>
            </div>
            <div className="icono-detalle">
              <Link>
                < FaRegEdit className="edit-icon-detalle" />
              </Link>
            </div>
          </div>
          <div className='imagen-producto'>
            <img src={Barril} alt="" />
          </div>
          <form className="detalle-from">
            <h1 className='titulo-detalle'>Barril Pequeño</h1>
            <div className="grupo-detalle">
              <div className="campo-detalle">
                <label htmlFor="producto">Producto</label>
                <input className="productico" type="text" id="producto" name="producto" />
              </div>
              <div className="campo-detalle">
                <label className='productico-2' htmlFor="correo">Categoria</label>
                <input className="productico-2"type="text" id="categoria" name="categoria" />
              </div>
            </div>
            <div className="grupo-detalle">
              <div className="campo-detalle">
                <label htmlFor="direccion">Dirección</label>
                <input className="productico" type="text" id="direccion" name="direccion" />
              </div>
              <div className="campo-detalle">
                <label className='productico-2' htmlFor="precio">Precio</label>
                <input  className="productico-2" type="text" id="precio" name="precio" />
              </div>
            </div>
            <div className="campo-detalle">
              <label htmlFor="descripcion">Descripción</label>
              <input type="text" id="descripcion" name="descripcion" />
            </div>
            <div className='botoncitos'>
            <button className='boton-detalle'><Link to="/">Eliminar</Link></button>
            <button className='boton-detalle-2'><Link to="/listaproductos">Volver a productos</Link></button>
            </div>
          </form>
        </div>
        
      </div>
     

    </div>
  )
}

export default ProductoDetalle