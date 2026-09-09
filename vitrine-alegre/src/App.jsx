import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Rodape from './components/Rodape/Rodape';
import Vitrine from './pages/Vitrine/Vitrine';
import DetalheProduto from './pages/DetalheProduto/DetalheProduto';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login/Login';
import MeusPedidos from './pages/MeusPedidos/MeusPedidos';
import MinhaConta from './pages/MinhaConta/MinhaConta';
import NaoEncontrado from './pages/NaoEncontrado';

export default function App() {
  const [termoBusca, setTermoBusca] = useState('');

  return (
    <>
      {/* Componente responsável por renderizar os avisos/toasts */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e255e',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#a3e635',
              secondary: '#1e255e',
            },
          },
        }} 
      />

      <Header termoBusca={termoBusca} setTermoBusca={setTermoBusca} />
      
      <div style={{ flex: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Vitrine 
                termoBusca={termoBusca} 
                setTermoBusca={setTermoBusca} 
              />
            } 
          />
          <Route path="/produtos/:id" element={<DetalheProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pedidos" element={<MeusPedidos />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </div>

      <Rodape />
    </>
  );
}