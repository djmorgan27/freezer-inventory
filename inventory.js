import axios from 'axios';

const API_URL = 'https://your-backend-service.onrender.com/api/inventory';

export const fetchInventory = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addItem = async (newItem) => {
    await axios.post(API_URL, newItem);
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const editItem = async (id, updatedItem) => {
    await axios.put(`${API_URL}/${id}`, updatedItem);
};
