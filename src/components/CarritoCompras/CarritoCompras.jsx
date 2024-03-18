import { FaTrashAlt } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./CarritoCompras.css";
import { useCartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
/* import { calcularSubtotal } from './../../../../frontt/src/services/CarritoService'; */

function CarritoCompras() {
  const { carrito, actualizarCantidad, deleteItemsToCart } = useCartContext()
  const ivaPorcentaje = 0.19;

  const handleCantidadChange = (itemId, newCantidad) => {
    actualizarCantidad(itemId, newCantidad)
  };

  const handleEliminarProducto = (itemId) => {
    deleteItemsToCart(itemId)
  };

  

  return (
    <div className="container">
      <Navbar />
      <div className="carrito-container">
        <div className="products-cart">
          <h3>Carrito</h3>
          {carrito.map((item) => (
            <div key={item.id} className="item-card">
              <figure>
                <img className="item-cart-img" src={`http://localhost:7000/imagen/${item.image}`} alt="" />
              </figure>
              <div className="description-item">
                <div className="items-descri">
                  <h3 className="name-item">{item.nombre}</h3>
                  <h4 className="title-descripcion">Descripcion:</h4>
                  <p className="">{item.descripcion}</p>
                  <div className="cantidad-item">
                    <label className="cant-item">Cantidad</label>
                    <select
                      name={`cantidad-${item.id}`}
                      id={`cantidad-${item.id}`}
                      value={item.cantidad}
                      onChange={(e) =>
                        handleCantidadChange(item.id, parseInt(e.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5].map((cantidad) => (
                        <option key={cantidad} value={cantidad}>
                          {cantidad}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="eliminar-item">
                    <div onClick={() => handleEliminarProducto(item.id)}>
                      <FaTrashAlt className="icon-trash" />
                    </div>
                  </div>
                </div>
                <div className="price-item">
                  <span>{`$${item.precio.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sale-cart">
          <h3>Resumen</h3>
          <div className="resumen-item">
            <span>Subtotal:</span>
            <span>
              $
              {carrito
                .reduce(
                  (total, item) =>
                    total + item.cantidad * parseFloat(item.precio),
                  0
                )
                .toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </span>
          </div>
          <div className="resumen-item">
            <span>IVA ({(ivaPorcentaje * 100).toFixed(0)}%):</span>
            <span>
              $
              {(
                carrito.reduce(
                  (total, item) =>
                    total + item.cantidad * parseFloat(item.precio),
                  0
                ) * ivaPorcentaje
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="resumen-item-total">
            <span>Total:</span>
            <span>
              $
              {(
                carrito.reduce(
                  (total, item) =>
                    total + item.cantidad * parseFloat(item.precio),
                  0
                ) +
                carrito.reduce(
                  (total, item) =>
                    total + item.cantidad * parseFloat(item.precio),
                  0
                ) *
                ivaPorcentaje
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <Link to="/pasarela1" >
            <button className="continuar-btn">Continuar al pago</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarritoCompras;
