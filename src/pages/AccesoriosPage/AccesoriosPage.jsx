import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CardsAccesorios from "../../components/CardsAccesorios/CardsAccesorios";
import "./Accesorios.css";

function AccesoriosPage() {
  return (
    <>
      <Navbar />
      <div className="contenido-accesorios">
        <CardsAccesorios />
      </div>
      <Footer />
    </>
  );
}

export default AccesoriosPage;
