import React, { useState } from 'react';
import Button from '@mui/material/Button';

const AddItemModal = ({ onClose, onSave }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    const handleSubmit = () => {
        onSave({ item, quantity: parseInt(quantity), unit });
    };

    return (
        <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ background: 'white', margin: 'auto', padding: '20px', width: '300px', textAlign: 'center' }}>
                <h2>Add Item</h2>
                <input
                    placeholder="Item Name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
                <input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    placeholder="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />
                <Button variant="contained" color="success" onClick={handleSubmit} style={{ margin: '10px' }}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddItemModal;
