import "./MenuLateral.css";
import Logo from "../../../assets/img/LogoBarrel.png";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
/* import { useNavigate } from "react-router-dom"; */
import { BiCategory } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";

function MenuLateral() {
/*   const navigate = useNavigate(); */

  /* function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  } */

  return (
    <>
      <div className="sidebar">
        <div className="user-section">
          <img src={Logo} alt="" className="user-image" />
        </div>
        <div className="menu-section">
          <ul className="menu-items">
            <li className="li-menu-lateral">
              <Link to="/perfilpage" className="link">
                <ImProfile className="profile" />
              </Link>
              <span className="tooltip">Perfil</span>
            </li>
            {localStorage.getItem("rolUser") === "1" && (
              <>
                <li className="li-menu-lateral">
                  <Link to="/listausuarios" className="link">
                    <FaRegUser className="usersIcno" />
                  </Link>
                  <span className="tooltip">Usuarios</span>
                </li>
                <li className="li-menu-lateral">
                  <Link to="/listacategoria" className="link">
                    <BiCategory className="categoria" />
                  </Link>
                  <span className="tooltip">Categoria</span>
                </li>
                <li className="li-menu-lateral">
                  <Link to="/listaproductos" className="link">
                    <BsShop className="productsIcono" />
                  </Link>
                  <span className="tooltip">Productos</span>
                </li>
                <li className="li-menu-lateral">
                  <Link to="/listaventas" className="link">
                    <MdPointOfSale className="sales" />
                  </Link>
                  <span className="tooltip">Ventas</span>
                </li>
                <li className="li-menu-lateral">
                  <Link to="/listaproveedores" className="link">
                    <MdLocalShipping className="proveedores" />
                  </Link>
                  <span className="tooltip">Proveedores</span>
                </li>
                <li className="li-menu-lateral">
                  <Link to="/listametodopago" className="link">
                    <TbPigMoney className="metodopago" />
                  </Link>
                  <span className="tooltip">Metodo de pago</span>
                </li>
              </>
            )}
            <li className="salir-menu-lateral">
              <Link to="/" className="salir">
                <IoIosLogOut className="salir-icono" />
              </Link>
              <span className="tooltip">Salir</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MenuLateral;
