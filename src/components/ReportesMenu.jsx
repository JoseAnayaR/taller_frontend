import React from 'react';
import { descargarReporte } from '../services/api';
import './ReportesMenu.css';

function ReportesMenu() {
    const reportes = [
        { id: 'clientes-activos', nombre: 'Clientes Activos' },
        { id: 'ingresos-mes', nombre: 'Ingresos por Mes' },
        { id: 'servicios-facturados', nombre: 'Servicios Facturados' },
        { id: 'servicios-pendientes', nombre: 'Servicios Pendientes' },
        { id: 'top-clientes', nombre: 'Top Clientes' },
        { id: 'resumen', nombre: 'Resumen Ejecutivo' },
    ];

    const handleDescargar = async (id) => {
        try {
        const response = await descargarReporte(id);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `reporte_${id}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
        } catch (err) {
        alert('Error al descargar reporte');
        }
    };

    return (
        <div className="container">
        <h1>Reportes</h1>
        <div className="reportes-grid">
            {reportes.map((reporte) => (
            <button
                key={reporte.id}
                className="reporte-btn"
                onClick={() => handleDescargar(reporte.id)}
            >
                📊 {reporte.nombre}
            </button>
            ))}
        </div>
        </div>
    );
}

export default ReportesMenu;