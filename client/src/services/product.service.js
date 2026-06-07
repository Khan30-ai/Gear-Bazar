import api from './api';

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const getProducts = async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const getFeaturedProducts = async () => {
    const response = await api.get('/products/featured');
    return response.data;
};

export const approveProduct = async (id) => {
    const response = await api.put(`/products/${id}/approve`);
    return response.data;
};

export const rejectProduct = async (id, reason) => {
    const response = await api.put(`/products/${id}/reject`, { reason });
    return response.data;
};

export const updateProductStock = async (id, stock) => {
    const response = await api.put(`/products/${id}/stock`, { stock });
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};
