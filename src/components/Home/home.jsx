import React from 'react'
import './home.css'
import Servicio from '../Servicios/Servicios'
import Beneficio from '../Beneficios/Beneficios'
import Contacto from '../Contacto/Contacto'
import Footer from '../footer/Footer'
const username = localStorage.getItem('username');
export default function Home() {
  return (
    <section className='section2'>
        <div className="containerInfo">
            <h1>HOLA, {username} </h1>
           
            <div className="botonesTitulo">
            <a className='button1' href="./About">Sobre Nosotros</a>
            <a className='button2' href="./gruas">Beneficios</a>
            </div>
        </div>
          <Servicio/>
          <Beneficio/>
          <Contacto/>
          <Footer/>
    </section>
   
  )
}
