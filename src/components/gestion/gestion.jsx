import './gestion.css';
import logo from '../../assets/e-shop.jpg'; 
import { useState } from 'react';
import ListaProductosLocal from './listaProductosLocal';
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
      {/* //GESTIÓN CONTENIDO */}
      <div className="gestion-contenido">
        {pestanaActiva === 'productos' && (
          <div className="gestion-productos">
            <h2>Productos</h2>
            <ListaProductosLocal />
          </div>
        )}
        {pestanaActiva === 'productosInt' && (
          <div className="gestion-productos">
            <h2>Productos Envío Internacional</h2>
            <p>Contenido de la pestaña de productos de envío internacional</p>
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