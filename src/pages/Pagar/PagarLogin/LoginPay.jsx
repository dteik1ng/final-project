import Navbar from '../../../components/Navbar/Navbar'
import '../PagarLogin/LoginPay.css'
import { Link } from 'react-router-dom';

function LoginPay() {
    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <h1>¡Hola! Para comprar, ingresa a tú cuenta</h1>

                 <Link to="/register" >  <button className="button-login" type="button">Registrarse</button></Link> 

                    <p className="text-login">
                        <Link to="/login">Iniciar Sesion</Link>
                    </p>
                </div>
            </div>

        </>
    );
}

export default LoginPay;