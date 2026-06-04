import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, desactivarCliente } from '../services/api';
import './ClientesList.css';

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        nombre: '',
        telefono: '',
        email: '',
    });

    // Cargar clientes al abrir
    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
        setLoading(true);
        const response = await getClientes();
        setClientes(response.data);
        setError(null);
        } catch (err) {
        setError('Error al cargar clientes');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.email) {
        alert('Completa nombre y email');
        return;
        }

        try {
        await createCliente(form);
        setForm({ nombre: '', telefono: '', email: '' });
        cargarClientes();
        alert('Cliente creado exitosamente');
        } catch (err) {
        alert('Error al crear cliente: ' + err.response?.data?.detail || err.message);
        }
    };

    const handleDesactivar = async (id) => {
        if (window.confirm('Desactivar este cliente? Sus servicios se mantienen.')) {
        try {
            await desactivarCliente(id);
            cargarClientes();
            alert('Cliente desactivado');
        } catch (err) {
            alert('Error al eliminar');
        }
        }
    };

    if (loading) return <div className="container"><p>Cargando...</p></div>;

    return (
        <div className="container">
        <h1>Gestión de Clientes</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
            <h2>Nuevo Cliente</h2>
            <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            />
            <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            />
            <input
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
            <button type="submit">Crear Cliente</button>
        </form>

        <div className="clientes-list">
            <h2>Clientes Registrados</h2>
            {clientes.length === 0 ? (
            <p>No hay clientes</p>
            ) : (
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                    <tr key={cliente.id} className={!cliente.activo ? 'inactivo' : ''}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono}</td>
                        <td>
                        {cliente.activo ? (
                            <span className="badge-activo">Activo</span>
                        ) : (
                            <span className="badge-inactivo">Inactivo</span>
                        )}
                        </td>
                        <td>
                        {cliente.activo ? (
                            <button
                            className="btn-desactivar"
                            onClick={() => handleDesactivar(cliente.id)}
                            >
                            Desactivar
                            </button>
                        ) : (
                            <span className="text-muted">—</span>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
        </div>
    );
}

export default ClientesList;