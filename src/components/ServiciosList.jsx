import React, { useState, useEffect } from 'react';
import { getServicios, getClientes, createServicio, marcarFacturado } from '../services/api';
import './ServiciosList.css';

function ServiciosList() {
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        descripcion: '',
        costo: '',
        cliente_id: '',
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
        setLoading(true);
        const [serviciosRes, clientesRes] = await Promise.all([
            getServicios(),
            getClientes(),
        ]);
        setServicios(serviciosRes.data);
        setClientes(clientesRes.data);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.descripcion || !form.costo || !form.cliente_id) {
        alert('Completa todos los campos');
        return;
        }

        try {
        await createServicio({
            descripcion: form.descripcion,
            costo: parseFloat(form.costo),
            cliente_id: parseInt(form.cliente_id),
        });
        setForm({ descripcion: '', costo: '', cliente_id: '' });
        cargarDatos();
        alert('Servicio creado');
        } catch (err) {
        alert('Error: ' + err.message);
        }
    };

    const handleFacturar = async (id) => {
        try {
        await marcarFacturado(id);
        cargarDatos();
        alert('Servicio marcado como facturado');
        } catch (err) {
        alert('Error: ' + err.message);
        }
    };

    if (loading) return <div className="container"><p>Cargando...</p></div>;

    return (
        <div className="container">
        <h1>Gestión de Servicios</h1>

        <form onSubmit={handleSubmit} className="form">
            <h2>Nuevo Servicio</h2>
            <input
            type="text"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            required
            />
            <input
            type="number"
            placeholder="Costo"
            step="0.01"
            value={form.costo}
            onChange={(e) => setForm({ ...form, costo: e.target.value })}
            required
            />
            <select
            value={form.cliente_id}
            onChange={(e) => setForm({ ...form, cliente_id: e.target.value })}
            required
            >
            <option value="">Selecciona cliente</option>
            {clientes.filter(c => c.activo === true)
            .map((c) => (
                <option key={c.id} value={c.id}>
                {c.nombre}
                </option>
            ))}
            </select>
            <button type="submit">Crear Servicio</button>
        </form>

        <div className="servicios-list">
            <h2>Servicios</h2>
            {servicios.length === 0 ? (
            <p>No hay servicios</p>
            ) : (
            <table>
                <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Descripción</th>
                    <th>Costo</th>
                    <th>Facturado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {servicios.map((servicio) => {
                    const cliente = clientes.find((c) => c.id === servicio.cliente_id);
                    return (
                    <tr key={servicio.id}>
                        <td>{cliente?.nombre || 'N/A'}</td>
                        <td>{servicio.descripcion}</td>
                        <td>${servicio.costo.toFixed(2)}</td>
                        <td>{servicio.facturado ? 'Sí' : 'No'}</td>
                        <td>
                        {!servicio.facturado && (
                            <button
                            className="btn-facturar"
                            onClick={() => handleFacturar(servicio.id)}
                            >
                            Facturar
                            </button>
                        )}
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            )}
        </div>
        </div>
    );
}

export default ServiciosList;