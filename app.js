import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { fetchInventory, addItem, deleteItem, editItem } from './api/inventory';
import InventoryList from './components/InventoryList';
import AddItemModal from './components/AddItemModal';

const App = () => {
    const [inventory, setInventory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadInventory = async () => {
            const data = await fetchInventory();
            setInventory(data);
        };
        loadInventory();
    }, []);

    const handleAddItem = async (item) => {
        await addItem(item);
        const updatedInventory = await fetchInventory();
        setInventory(updatedInventory);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Freezer Inventory</h1>
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                Add Item
            </Button>
            <InventoryList inventory={inventory} onDelete={deleteItem} onEdit={editItem} />
            {isModalOpen && <AddItemModal onClose={() => setIsModalOpen(false)} onSave={handleAddItem} />}
        </div>
    );
};

export default App;
