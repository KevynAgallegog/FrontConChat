import { useState } from 'react';
import { SERVER_URL } from '../../constants/constants';
import './Login.css';
import Swal from 'sweetalert2';

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const contrasenia = formData.get('contrasenia');
    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasenia }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
      }).then(() => {
        window.location.href = '/Home';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Por favor, verifica tus credenciales e intenta de nuevo.',
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='iniciar'>Iniciar Sesión</h2>
        <label className='label-login'>Correo Electrónico:
          <input
            className='input-login'
            type="email"
            name="email"
            required
          />
        </label>

        <label className='label-login'>Contraseña:
          <input
            className='input-login'
            type="password"
            name="contrasenia"
            required
          />
        </label>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};
