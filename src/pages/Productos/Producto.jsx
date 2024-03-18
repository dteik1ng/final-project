import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Productos.css";

function Producto() {
  return (
    <>
      <Navbar />
      <div className="contenido-products">
        <Cards />
      </div>
      <Footer />
    </>
  );
}

export default Producto;
