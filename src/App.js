import React, { useState } from 'react';
import ClientesList from './components/ClientesList';
import ServiciosList from './components/ServiciosList';
import ReportesMenu from './components/ReportesMenu';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('clientes');

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">🔧 Taller API</h1>
        <ul className="nav-menu">
          <li>
            <button
              className={currentPage === 'clientes' ? 'active' : ''}
              onClick={() => setCurrentPage('clientes')}
            >
              Clientes
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'servicios' ? 'active' : ''}
              onClick={() => setCurrentPage('servicios')}
            >
              Servicios
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'reportes' ? 'active' : ''}
              onClick={() => setCurrentPage('reportes')}
            >
              Reportes
            </button>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {currentPage === 'clientes' && <ClientesList />}
        {currentPage === 'servicios' && <ServiciosList />}
        {currentPage === 'reportes' && <ReportesMenu />}
      </main>
    </div>
  );
}

export default App;