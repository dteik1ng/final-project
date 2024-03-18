import { useState } from 'react';
import './Contraseña.css';

const Contraseña = () => {
    const [email, setEmail] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setSentCode(true);
    };

    const handleVerificationCodeSubmit = (e) => {
        e.preventDefault();
        console.log('Código de verificación enviado:', verificationCode);
    };

    const handleResendCode = () => {
        console.log('Reenviando código de verificación...');
    };

    return (
        <div>
            {!sentCode && (
                <div className='recuperacion-contraseña'>
                    <div className='contraseña-recuperar'>
                        <h1>¿Olvidaste tu Contraseña?</h1>
                        <p>Ingresa tu email y te ayudaremos</p>
                        <form className="recuperar-contraseña" onSubmit={handleEmailSubmit}>
                            <div className='recu'>
                                <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <button className='button-recuperar' type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}

            {sentCode && (
                <div className='verificacion'>
                    <div className='verificacion-contraseña'>
                        <h1>Verificación del email</h1>
                        <p>Hemos enviado un código a tu correo: {email}</p>
                        <form className='verificacion-codigo' onSubmit={handleVerificationCodeSubmit}>
                            <div className="codigo-container">
                                <input type="text" value={verificationCode[0] || ''} onChange={(e) => setVerificationCode(prevState => [e.target.value, prevState[1], prevState[2], prevState[3]])} maxLength="1" required />
                                <input type="text" value={verificationCode[1] || ''} onChange={(e) => setVerificationCode(prevState => [prevState[0], e.target.value, prevState[2], prevState[3]])} maxLength="1" required />
                                <input type="text" value={verificationCode[2] || ''} onChange={(e) => setVerificationCode(prevState => [prevState[0], prevState[1], e.target.value, prevState[3]])} maxLength="1" required />
                                <input type="text" value={verificationCode[3] || ''} onChange={(e) => setVerificationCode(prevState => [prevState[0], prevState[1], prevState[2], e.target.value])} maxLength="1" required />
                            </div>
                            <button className='boton-verificacion' type="submit">Verificar Cuenta</button>
                        </form>
                        <p>¿No recibiste el código? <a href="#" onClick={handleResendCode} className="link-reenviar">Reenviar Código</a></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contraseña;