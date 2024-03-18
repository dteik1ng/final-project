import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./VerMas.css";
import { useCartContext } from "../../Context/CartContext";

function VerMas() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  const { addItemsToCart } = useCartContext();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/productos/${id}`
        );
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    const fetchProductosMasVendidos = async () => {
      try {
        const response = await axios.get("http://localhost:7000/productos");
        const productos = response.data;
        const randomProducts = getRandomProducts(productos, 3);
        setProductosMasVendidos(randomProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProducto();
    fetchProductosMasVendidos();
  }, [id]);

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const addHandlerCarrito = () => {
    addItemsToCart(producto);
  };

  return (
    <div>
      <Navbar />
      <div className="container-verdetalle">
      <div className="verdetalle">
        <img
          className="image-vermas"
          src={`http://localhost:7000/imagen/${producto.image}`}
          alt="upload"
        />
        <div className="informacion">
          <h1 className="titulo-1">{producto.nombre}</h1>
          <p className="valor-producto">${producto.precio}</p>
          <h3 className="titulo-descri">Descripción</h3>
          <div className="descripcion-detalle">
            <p className="descripcion-product-vermas">{producto.descripcion}</p>
          </div>
          <div className="botones-detalle">
            <button className="button-volver">
              <Link to="/producto">Volver</Link>
            </button>
            <button className="button-carrito">
              <Link to="" onClick={addHandlerCarrito}>
                Añadir al Carrito
              </Link>
            </button>
          </div>
        </div>
      </div>
      </div> 

      <div className="part-three">
        <h1>PRODUCTOS RECOMENDADOS</h1>
        <div className="cards-body">
          {productosMasVendidos.map((producto) => (
            <div key={producto.id} className="card-productos-destacados">
              <div className="img-productos-destacados">
                <img
                  src={`http://localhost:7000/imagen/${producto.image}`}
                  alt="upload"
                />
                <div className="overlay-productos-destacados">
                  <button className="button-overlay-productos-destacados">
                    <Link to={`/vermas/${producto.id}`}>Ver más</Link>
                  </button>
                </div>
              </div>
              <div className="body-card-productos-destacados">
                <h3 className="tittle-card-productos-destacados">
                  {producto.nombre}
                </h3>
                <p className="description-card-productos-destacados">
                  Descripción:{" "}
                </p>
                <p>{producto.descripcion}</p>
                <ul>
                  <li className="price-productos-destacados">
                    ${producto.precio}
                  </li>
                </ul>
                <div className="button-card">
                  <Link to={`/vermas/${producto.id}`}>
                    <button className="button-card-add">Ver más</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerMas;
