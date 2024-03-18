/* eslint-disable react/prop-types */
import { useCartContext } from '../../Context/CartContext';
import './CardStyle.css';
import { Link } from 'react-router-dom';

function Card({ producto }) {
  const { id, nombre, descripcion, precio, image } = producto;

  const { addItemsToCart } = useCartContext()

  const addHandlerCarrito = () => {
    addItemsToCart(producto);
  }
  return (
    <div className='Card'>
      <div className='container-img'>
        <img src={`http://localhost:7000/imagen/${image}`} alt="upload" />
        <div className='overlay'>
          <button className='button-overlay'>
            <Link to={`/vermas/${id}`}>Ver más</Link>
          </button>
        </div>
      </div>
      <div className='body-card'>
        <h3 className='tittle-card'>{nombre}</h3>
        <p className='description-card'>Descripción: </p>
        <p>{descripcion}</p>
        <ul>
          <li className='price'>${precio}</li>
        </ul>
        <div className='button-card'>
          <button className='button-card-add' onClick={addHandlerCarrito}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
