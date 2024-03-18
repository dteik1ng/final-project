import { useState } from 'react';
import './Pasarela1.css';
import Navbar from './../../../components/Navbar/Navbar';

function PaymentForm() {
  const [formData1, setFormData1] = useState({
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    city: '',
  });

  const [formData2, setFormData2] = useState({
    bank: '',
    cardNumber: '',
    cardHolder: '',
    cvv: '',
    installment: '',
    expirationMonth: '',
    expirationYear: '',
  });

  const [formData3] = useState({
    bank: '',
    cardNumber: '',
    cardHolder: '',
    phone: '',
    address: '',
    cc: '',
    installment: '',
  });

  const [step, setStep] = useState(1);

  const handleFormSubmit1 = (e) => {
    e.preventDefault();
    // Validar datos del formulario 1
    // Si son válidos, avanzar al siguiente paso
    setStep(2);
  };

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
    // Validar datos del formulario 2
    // Si son válidos, avanzar al siguiente paso
    setStep(3);
  };

  const handleFormSubmit3 = (e) => {
    e.preventDefault();
    // Validar datos del formulario 3 y enviar la información de pago
    // Aquí puedes llamar a una función que maneje la pasarela de pago
  };



  return (
    <div>
      <Navbar />
      <div className="step-indicator">
        <div className={step >= 1 ? 'step completed' : 'step'}>1</div>
        <div className="step-line"></div>
        <div className={step >= 2 ? 'step completed' : 'step'}>2</div>
        <div className="step-line"></div>
        <div className={step >= 3 ? 'step completed' : 'step'}>3</div>
      </div>



      {/* Datos personales */}
      {step === 1 && (
        <div className='pasarela1'>
          <h2>Datos Personales</h2>
          <form className='form-pasarela1' onSubmit={handleFormSubmit1}>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className="pasarela-label">Nombre </label>
                <input
                  type="text"
                  value={formData1.fullName}
                  onChange={(e) => setFormData1({ ...formData1, fullName: e.target.value })}
                  required
                  placeholder='Nombre Completo'
                />
              </div>
              <div className="campo-pasarela-1">
                <label className="pasarela-label">Correo</label>
                <input
                  type="email"
                  value={formData1.email}
                  onChange={(e) => setFormData1({ ...formData1, email: e.target.value })}
                  required
                  placeholder='Correo Electronico'

                />
              </div>
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className="pasarela-label">Celular</label>
                <input
                  type="number"
                  value={formData1.phone}
                  onChange={(e) => setFormData1({ ...formData1, phone: e.target.value })}
                  required
                  placeholder='Telefono Celular'
                />
              </div>
              <div className="campo-pasarela-1">
                <label className="pasarela-label">Código Postal</label>
                <input
                  type="number"
                  value={formData1.postalCode}
                  onChange={(e) => setFormData1({ ...formData1, postalCode: e.target.value })}
                  required
                  placeholder='Codigo Postal'
                />
              </div>
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className="pasarela-label">Dirección</label>
                <input
                  type="text"
                  value={formData1.address}
                  onChange={(e) => setFormData1({ ...formData1, address: e.target.value })}
                  required
                  placeholder='Calle'
                />
              </div>

              <div className="campo-pasarela-1">
                <label className="pasarela-label">Ciudad</label>
                <input
                  type="text"
                  value={formData1.neighborhood}
                  onChange={(e) => setFormData1({ ...formData1, neighborhood: e.target.value })}
                  required
                  placeholder='Cuidad'
                />
              </div>
            </div>

            <div className="campo">
              <button className='pasarela1-boton'>Siguiente</button>
            </div>
          </form>
        </div>
      )}





















      {step === 2 && (
        <div className='pasarela2'>
          <h2 className='datos-bancarios-titulo'>Datos Bancarios</h2>
          <form className='form-pasarela2' onSubmit={handleFormSubmit2}>


            <label className='datos-bancarios-label'>Pago:</label>
            <div>
              <label className='datos-bancarios-label'>Tarjeta de Credito</label>
              <input
                id="banco1"
                className='datos-bancarios-opcion'
                type="checkbox"
                value={formData2.bank}
                onChange={(e) => setFormData2({ ...formData2, cardNumber: e.target.value })}
              />
            </div>
            <div>
              <label className='datos-bancarios-label'>PayPal</label>
              <input
                id="banco2"
                className='datos-bancarios-opcion'
                type="checkbox"
                value={formData2.bank}
                onChange={(e) => setFormData2({ ...formData2, cardNumber: e.target.value })}
              />
            </div>
            <div>
              <label className='datos-bancarios-label'>MercadoPago</label>
              <input
                id="banco2"
                className='datos-bancarios-opcion'
                type="checkbox"
                value={formData2.bank}
                onChange={(e) => setFormData2({ ...formData2, cardNumber: e.target.value })}
              />
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className='datos-bancarios-label'>Número de Tarjeta:</label>
                <input
                  className='datos-bancarios-input'
                  placeholder='Número de tarjeta'
                  type="number"
                  value={formData2.cardNumber}
                  onChange={(e) => setFormData2({ ...formData2, cardNumber: e.target.value })}
                  required
                />
              </div>
              <div className="campo-pasarela-1">
                <label className='datos-bancarios-label'>Titular de la Tarjeta:</label>
                <input
                  className='datos-bancarios-input'
                  placeholder='Titular'
                  type="text"
                  value={formData2.cardHolder}
                  onChange={(e) => setFormData2({ ...formData2, cardHolder: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className='datos-bancarios-label'>CVV:</label>
                <input
                  className='datos-bancarios-input'
                  placeholder='Ingresa el CVV'
                  type="number"
                  value={formData2.cvv}
                  onChange={(e) => setFormData2({ ...formData2, cvv: e.target.value })}
                  required
                />
              </div>
              <div className="campo-pasarela-1">
                <label className='datos-bancarios-label'>Cuotas:</label>
                <input
                  className='datos-bancarios-input'
                  placeholder='Número de cuotas'
                  type="number"
                  value={formData2.installment}
                  onChange={(e) => setFormData2({ ...formData2, installment: e.target.value })}
                  required
                />
              </div>
            </div>
            <label className='datos-bancarios-label'>Vencimiento:</label>
            <div className='datos-bancarios-select'>
              <select
                value={formData2.expirationMonth}
                onChange={(e) => setFormData2({ ...formData2, expirationMonth: e.target.value })}
                required
              >
                <option value="">Mes</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>

              <select
                value={formData2.expirationYear}
                onChange={(e) =>
                  setFormData2({ ...formData2, expirationYear: e.target.value })
                }
                required
              >
                <option className='año-select' value="">Año</option>
                {[...Array(2030 - 2000 + 1)].map((_, index) => (
                  <option key={2000 + index} value={2000 + index}>
                    {2000 + index}
                  </option>
                ))}
              </select>

            </div>
            <button className='datos-bancarios-boton' type="submit">Siguiente</button>
          </form>
        </div>
      )}


      {step === 3 && (
        <div className='pasarela3'>
          <h2>Datos de la Compra</h2>
          <form className='form-pasarela3' onSubmit={handleFormSubmit3}>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className='pasarela3-label'>Banco:</label>
                <input
                  type="text"
                  value={formData3.bank}
                  readOnly
                  required
                />
              </div>
              <div className="campo-pasarela-1">
                <label className='pasarela3-label'>Número de Tarjeta:</label>
                <input
                  type="text"
                  value={formData3.cardNumber}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className='pasarela3-label'>Titular de la Tarjeta:</label>
                <input
                  type="text"
                  value={formData3.cardHolder}
                  readOnly
                  required
                />
              </div>
              <div className="campo-pasarela-1">
                <label className='pasarela3-label'>Celular:</label>
                <input
                  type="tel"
                  value={formData3.phone}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="pasarela-group">
              <div className="campo-pasarela">
                <label className='pasarela3-label'>Numero  Cuotas:</label>
                <input
                  type="text"
                  value={formData3.address}
                  readOnly
                  required
                />
              </div>
              <div className="campo-pasarela-1">
                <label className='pasarela3-label'>Cédula de Ciudadanía:</label>
                <input
                  type="text"
                  value={formData3.cc}
                  readOnly
                  required
                />
              </div>
            </div>
            <label className='pasarela3-label'>Direccion:</label>
            <input
              type="address"
              value={formData3.installment}
              readOnly
              required
              className='address'
            />
            <button className='pasarela3-boton' type="submit">Pagar</button>
          </form>
        </div>
      )}


    </div>
  );
}

export default PaymentForm;
