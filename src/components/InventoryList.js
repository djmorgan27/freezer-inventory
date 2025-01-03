import React from 'react';
import Button from '@mui/material/Button';

const InventoryList = ({ inventory, onDelete, onEdit }) => (
    <div>
        {inventory.map(item => (
            <div key={item.id}>
                {item.item} - {item.quantity} ({item.unit})
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(item.id)}
                >
                    Delete
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                        const updatedItem = { ...item, quantity: item.quantity + 1 }; // Example edit
                        onEdit(item.id, updatedItem);
                    }}
                >
                    Edit
                </Button>
            </div>
        ))}
    </div>
);

export default InventoryList;
