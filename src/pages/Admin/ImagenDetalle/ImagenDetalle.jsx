import MenuLateral from '../../../components/Admin/MenuLateral/MenuLateral';
import { FaRegEdit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import Barril from '../../../assets/img/Barriles.jpg'
import './ImagenDetalle.css'
function ImagenDetalle() {
  return (
    <>
      <MenuLateral />

      <div className="imagen-detalle">
        <div className="img-detalle">
          <div className="left-detalle">
            <div className="icone-detalle">
              <Link>
                < CiImageOn className="imagen-icno" />
              </Link>
            </div>
            <div className="icond-detalle">
              <Link>
                < FaRegEdit className="edict-imagenes" />
              </Link>
            </div>
          </div>
          <div className="contenido-img">
            <h1 className='title-img'>Barril Pequeño</h1>
            <div className='img-detalleproducto'>
              <img src={Barril} alt="" />
            </div>
            <div className='botones-imagenes'>
              <button className='boton-imagen'><Link to="/">Eliminar</Link></button>   
              <button className='boton-imagen-2'><Link to="/productodetalle">Volver a productos </Link></button>
             
            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default ImagenDetalle;