import axios from 'axios';

// URL de tu API viva
const API_BASE_URL = 'https://tallerapi-production.up.railway.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    },
});

// CLIENTES
export const getClientes = (params = {}) => {
    return api.get('/clientes/', { params });
};

export const createCliente = (data) => {
    api.post('/clientes/', data);
};

export const updateCliente = (id, data) => {
    return api.put(`/clientes/${id}`, data);
};

export const desactivarCliente = (id) => {
    return api.patch(`/clientes/${id}/desactivar`);
};

// SERVICIOS
export const getServicios = (params = {}) => {
    return api.get('/servicios/', { params });
};

export const createServicio = (data) => {
    return api.post('/servicios/', data);
}; 

export const marcarFacturado = (id) => {
    return api.patch(`/servicios/${id}/facturar`);
};

// REPORTES
export const descargarReporte = (tipo) => {
    return api.get(`/reportes/${tipo}`, {
    responseType: 'blob',
    });
};

export default api;