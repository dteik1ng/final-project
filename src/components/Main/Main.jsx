/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faShieldAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./MainStyle.css";
import imagenes from "../../assets/imagenes";
import { TbMeat } from "react-icons/tb";
import { SiSteelseries } from "react-icons/si";
import { IoBookOutline } from "react-icons/io5";
import { GiSmokeBomb } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";

function Main() {
  const partTwoRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    imagenes.Carnita,
    imagenes.Tocinobarril,
    imagenes.Carnes,
/*     imagenes.Barcarne /* Add more images here */
  ];

  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  const handleScrollToPartTwo = () => {
    const partTwoPosition = partTwoRef.current.offsetTop;
    const currentPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const distance = partTwoPosition - currentPosition;
    let steps = 50;
    const stepSize = distance / steps;
    const smoothScroll = () => {
      if (steps > 0) {
        window.scrollBy(0, stepSize);
        steps--;
        setTimeout(smoothScroll, 10);
      }
    };
    smoothScroll();
  };

  const handleImageChange = (direction) => {
    const newIndex =
      (currentImageIndex + images.length + direction) % images.length;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => handleImageChange(1), 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
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

    fetchProductosMasVendidos();
  }, []);

  const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div>
      <div className="part-one">
        <div className="tittle">
          <h1>BARRELGLOW</h1>
          <p>¡No hay nada más rico que una carnita asada!</p>
          <button className="button-part-one" onClick={handleScrollToPartTwo}>
            Más Información
          </button>
        </div>
        <div className="img-part-one">
          <img src={images[currentImageIndex]} alt="BarrilGlow Asador" />
        </div>
      </div>

      <div className="part-two" ref={partTwoRef}>
        <div className="tittle-part-two">
          <h1>BIENVENIDOS A NUESTRA TIENDA</h1>
          <p>¡No te pierdas de nuestros fascinantes barriles!</p>
          <ul>
            <li>
              Libres de humo <GiSmokeBomb className="humo" />
            </li>
            <li>
              Faciles de usar <IoBookOutline className="faciles" />
            </li>
            <li>
              La carne queda mucho mas rica <TbMeat className="carne" />
            </li>
            <li>
              Acero inoxidable <SiSteelseries className="acero" />
            </li>
          </ul>
        </div>
        <div className="img-part-two">
          <img src={imagenes.Barril} alt="" />
        </div>
      </div>

      <div className="part-three">
        <h1>LOS PRODUCTOS MAS VENDIDOS</h1>
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
        <div className="container-button">
          <button className="button-part-three">
            <Link to="/producto">Ver Más Productos</Link>
          </button>
        </div>
      </div>

      <div className="part-four">
        <div className="icons-part-four">
          <div className="container-icons">
            <FontAwesomeIcon icon={faShippingFast} className="icon-homepage" />
            <h3>Envio GRATIS</h3>
            <p>Por tiempo limitado</p>
          </div>
          <div className="container-icons">
            <FontAwesomeIcon icon={faShieldAlt} className="icon-homepage" />
            <h3>Garantia</h3>
            <p>Tus pedidos con garantía</p>
          </div>
          <div className="container-icons">
            <FontAwesomeIcon icon={faCreditCard} className="icon-homepage" />
            <h3>Compras Seguras</h3>
            <p>SSL Cifrado 100%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
