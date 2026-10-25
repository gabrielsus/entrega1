import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; // El layout ya tiene TODO adentro (Header, Outlet y Footer)
import Home from './components/home';
import ItemListContainer from './components/itemListContainer';
import Cart from './components/cart/cart'
import DetalleProducto from './components/detalleProducto';
import ItemListContainerFirebase from './components/itemListContainerFirebase';
import Gestion from './components/gestion/gestion'; // Importamos el componente Gestion
function App() {
  return (
      <Routes>
        {/* El Layout es el único que se encarga de estructurar la página */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productosinternacionales" element={<ItemListContainerFirebase />} />
          <Route path="/carrito" element={<Cart />} />
          {/* Ruta dinámica para el detalle del producto (usando el ID) */}
          <Route path="/producto/:id" element={<DetalleProducto />} />
          {/* Ruta para la página de gestión */}
          
        </Route>
        <Route path="/gestion" element={<Gestion />} />
      </Routes>
  );
}

export default App;