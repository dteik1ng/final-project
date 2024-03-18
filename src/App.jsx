import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Producto from "./pages/Productos/Producto";
import AccesoriosPage from "./pages/AccesoriosPage/AccesoriosPage";

import PerfilPage from "./pages/Admin/PerfilPage/PerfilPage";
import ListaProductos from "./pages/Admin/ListaProductos/ListaProductos";
import ListaUsuarios from "./pages/Admin/ListaUsuarios/ListaUsuarios";
import ListaVentas from "./pages/Admin/ListaVentas/ListaVentas";
import ListaMetodoPago from "./pages/Admin/ListaMetodoPago/ListaMetodoPago";
import ListaCategoria from "./pages/Admin/ListaCategoria/ListaCategoria";
import ListaProveedores from "./pages/Admin/ListaProveedores/ListaProveedores";

import UsuarioEspecifico from "./pages/Admin/UsuarioEspecifico/UsuarioEspecifico";

import Contacto from "./pages/ContactoPage/ContactoPage";

import ProductoDetalle from "./pages/Admin/ProductoDetalle/ProductoDetalle";

import VerMas from "./pages/VerMas/VerMas";
import ImagenDetalle from "./pages/Admin/ImagenDetalle/ImagenDetalle";
import DetallesVentas from "./pages/Admin/DetallesVentas/DetallesVentas";

import CarritoCompras from "./components/CarritoCompras/CarritoCompras";
import Contraseña from "./pages/Contraseña/Contraseña";

import LoginPay from "./pages/Pagar/PagarLogin/LoginPay";
import PagarUno from "./pages/Pagar/PagarUno/PagarUno";
import PagarDos from "./pages/Pagar/PagarDos/PagarDos";
import PagarTres from "./pages/Pagar/PagarTres/PagarTres";
import Factura from "./pages/Pagar/PagarFactura/Factura";

import AgregarUsuario from "./pages/agregarUsuario/AgregarUsuario";
import AgregarProducto from "./pages/agregarProducto/AgregarProducto";
import AgregarCategoria from "./pages/agregarCategoria/agregarCategoria";
import AgregarMetodo from "./pages/agregarMetodoPago/AgregarMetodo";
import Agregarproveedores from "./pages/agregarproveedores/AgregarProveedores";

import Pasarela1 from "./pages/PasarelaPgao/Pasarela1/Pasarela1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/accesorios" element={<AccesoriosPage />} />{" "}
        {/* Hasta acá todo esta bien en estilo y responsive */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carritoCompras" element={<CarritoCompras />} />
        <Route path="/pagarlogin" element={<LoginPay />} />
        <Route path="/pagaruno" element={<PagarUno />} />
        <Route path="/pagardos" element={<PagarDos />} />
        <Route path="/pagartres" element={<PagarTres />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/listaproductos" element={<ListaProductos />} />
        <Route path="/listacategoria" element={<ListaCategoria />} />
        <Route path="/listametodopago" element={<ListaMetodoPago />} />
        <Route path="/listausuarios" element={<ListaUsuarios />} />
        <Route path="/listaproveedores" element={<ListaProveedores />} />
        <Route path="/perfilpage" element={<PerfilPage />} />
        <Route path="/listaventas" element={<ListaVentas />} />
        <Route path="usuarioespecifico" element={<UsuarioEspecifico />} />
        <Route path="/productodetalle" element={<ProductoDetalle />} />
        <Route path="/vermas/:id" element={<VerMas />} />
        <Route path="/imagendetalle" element={<ImagenDetalle />} />
        <Route path="/detallesventas" element={<DetallesVentas />} />
        <Route path="/contraseña" element={<Contraseña />} />
        <Route path="/agregarUser" element={<AgregarUsuario />} />
        <Route path="/agregarProducto" element={<AgregarProducto />} />
        <Route path="/pasarela1" element={<Pasarela1 />} />
        <Route path="/agregarcategoria" element={<AgregarCategoria />} />
        <Route path="/agregarproveedores" element={<Agregarproveedores />} />
        <Route path="/agregarMetodo" element={<AgregarMetodo />} />
      </Routes>
    </Router>
  );
}

export default App;
