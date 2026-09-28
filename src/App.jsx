import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; // El layout ya tiene TODO adentro (Header, Outlet y Footer)
import Home from './components/home';
import ItemListContainer from './components/itemListContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout es el único que se encarga de estructurar la página */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;