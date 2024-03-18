import imagenes from "../../assets/imagenes";
import '../Banner(Pagar)/Banner.css'

function Banner() {
  return (
    <>
      <div className="banner-header">
        <img src={imagenes.Todo} alt="" />
        <h1>Información de pago</h1>
      </div>

    </>
  );
}

export default Banner;
