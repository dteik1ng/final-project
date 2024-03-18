/* eslint-disable react/prop-types */
import './CardAccesorios.css';
import { useCartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

function CardAccesorios({ producto }) {
  const { id, nombre, descripcion, precio, image } = producto;

  const { addItemsToCart } = useCartContext()

  const addHandlerCarrito = () => {
    addItemsToCart(producto)
  }
    return (
        <div className='Card-accesorios'>
        <div className='container-img-accesorios'>
          <img src={`http://localhost:7000/imagen/${image}`} alt="upload" />
          <div className='overlay-accesorios'>
            <button className='button-overlay-accesorios'>
              <Link to={`/vermas/${id}`}>Ver más</Link>
            </button>
          </div>
        </div>
        <div className='body-card-accesorios'>
          <h3 className='tittle-card-accesorios'>{nombre}</h3>
          <p className='description-card-accesorios'>Descripción: </p>
          <p>{descripcion}</p>
          <ul>
            <li className='price-accesorios'>${precio}</li>
          </ul>
          <div className='button-card-accesorios'>
            <button className='button-card-add-accesorios' onClick={addHandlerCarrito}>Añadir al carrito</button>
          </div>
        </div>
      </div>
    )
}

export default CardAccesorios