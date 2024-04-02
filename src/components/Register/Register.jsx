import React, { useState } from 'react';
import './Register.css';
import { SERVER_URL } from '../../constants/constants';
import { validateFields } from '../../constants/utils';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');

    // Verificar si algún campo está vacío
    if (!username || !email || !phone || !password) {
      // Mostrar mensaje de error con Swal.fire
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error"
      });
      return;
    }

    let fields;
    try {
      fields = validateFields(username, email, phone, password);
    } catch (error) {
      setErrorMessages({ [error.field]: error.message });
      return;
    }

    console.log(fields);
    const response = await fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Registro correcto',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'my-popup-class',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('username', username);
          window.location.href = '/';
        }
      });
    } else {
      const errorData = await response.json();
      console.error('Error al registrar el usuario:', errorData);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registro incorrecto',
      });
    }
  };

  return (
    <section className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="tituloRegister">Registro</h2>
        <label className="label-register">
          Usuario:
          <input className="input-register" type="text" name="username" />
        </label>
        <label className="label-register">
          Correo electrónico:
          <input className="input-register" type="email" name="email" />
        </label>
        <label className="label-register">
          Número telefónico:
          <input className="input-register" type="tel" name="phone" />
        </label>
        <label className="label-register">
          Contraseña:
          <div className="password-input-container">
            <input
              className="input-register"
              type={showPassword ? 'text' : 'password'}
              name="password"
            />
            <div className="toggle-password-btn-container">
              <button
                type="button"
                onClick={handleTogglePassword}
                className="toggle-password-btn"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="password-toggle-icon"
                />
              </button>
            </div>
          </div>
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
}
