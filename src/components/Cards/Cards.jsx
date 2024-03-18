import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Card from "../Card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./CardsStyle.css";
import "react-toastify/dist/ReactToastify.css";

function Cards() {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(10000000);
  const [filtroAplicado, setFiltroAplicado] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:7000/productos");
        const filteredProductos = response.data.filter(
          (producto) => producto.CategoriaId === 1
        );
        setProductos(filteredProductos);
      } catch (error) {
        toast.error("¡Ups! Ocurrió un error.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchProductos();
  }, []);

  const handleChangePrecioMin = (event) => {
    const min = parseFloat(event.target.value);
    setPrecioMin(min);
    setFiltroAplicado(true);
  };

  const handleChangePrecioMax = (event) => {
    const max = parseFloat(event.target.value);
    setPrecioMax(max);
    setFiltroAplicado(true);
  };

  const handleFiltrarPorPrecio = () => {
    if (!filtroAplicado || (precioMin === 0 && precioMax === Infinity)) {
      return productos;
    } else {
      return productos.filter(
        (producto) =>
          producto.precio >= precioMin &&
          producto.precio <= precioMax &&
          producto.CategoriaId === 1
      );
    }
  };

  const handleLimpiarFiltro = () => {
    setPrecioMin(0);
    setPrecioMax(10000000);
    setFiltroAplicado(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProductos = handleFiltrarPorPrecio().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = Math.ceil(handleFiltrarPorPrecio().length / itemsPerPage);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container-cards">
      <ToastContainer />
      
      <div className="menu-icon" onClick={toggleFilters}>
        <FiMenu />
      </div>

      <div className={`filters ${showFilters ? 'visible' : 'hidden'}`}>
        <div className="price-filter">
          <h1>Filtrar:</h1>
          <label htmlFor="precioMin" className="rango-precio">
            Precio Mínimo:
          </label>
          <input
            type="number"
            className="inputs-precio-filtro"
            id="precioMin"
            value={precioMin}
            onChange={handleChangePrecioMin}
          />
          <label htmlFor="precioMax" className="rango-precio">
            Precio Máximo:
          </label>
          <input
            type="number"
            className="inputs-precio-filtro"
            id="precioMax"
            value={precioMax}
            onChange={handleChangePrecioMax}
          />
          <div className="buttons-filtros">
            <button className="button-limpiar-filtro" onClick={handleLimpiarFiltro}>
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="container-two-cards">
        <div className="cards">
          {currentProductos.map((producto, i) => (
            <Card key={i} producto={producto} />
          ))}
        </div>
      </div>

      <div className="pagination-container">
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Cards;
