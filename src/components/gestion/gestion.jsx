import './gestion.css';
import logo from '../../assets/e-shop.jpg'; 
import { useState } from 'react';
import ListaProductosLocal from './listaProductosLocal';
import ListaProductosInternacional from './listaProductosInternacional';
import UserBar from '@/components/userbar'; // Ajustá la ruta según tu estructura de carpetas

const Gestion = () => {
  const [pestanaActiva, setPestanaActiva] = useState('productos');

  return (
    <div className="gestion-container">
      <div className="gestion-encabezado">
        <div className="gestion-izquierda">
          <img className="gestion-logo" src={logo} alt="Logo" />
          <div className="gestion-textos">
            <h1 className="gestion-titulo">Bienvenidos a la página de gestión</h1>
            <h3 className="gestion-subtitulo">Administración de productos y cupones</h3>
          </div>
        </div>
        
        {/* Agregamos la barra de usuario en la esquina superior derecha */}
        <div className="gestion-derecha">
          <UserBar />
        </div>
      </div>

      {/* // Gestión de tabs */}
      <div className="gestion-tabs">
        <button className={"tab-btn " + (pestanaActiva === 'productos' ? 'activa' : '')} onClick={() => setPestanaActiva('productos')}>
          Productos Envío Local
        </button>
        <button className={"tab-btn " + (pestanaActiva === 'productosInt' ? 'activa' : '')} onClick={() => setPestanaActiva('productosInt')}>
          Productos Envío Internacional
        </button>
        <button className={"tab-btn " + (pestanaActiva === 'cupones' ? 'activa' : '')} onClick={() => setPestanaActiva('cupones')}>
          Cupones
        </button>
      </div>

      {/* // GESTIÓN CONTENIDO */}
      <div className="gestion-contenido">
        {pestanaActiva === 'productos' && (
          <div className="gestion-productos">
            <h2>Productos</h2>
            <ListaProductosLocal />
          </div>
        )}
        {pestanaActiva === 'productosInt' && (
          <div className="gestion-productos">
            <h2>Productos</h2>
            <ListaProductosInternacional />
          </div>
        )}
        {pestanaActiva === 'cupones' && (
          <div className="gestion-cupones">
            <h2>Cupones</h2>
            <p>Contenido de la pestaña de cupones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gestion;