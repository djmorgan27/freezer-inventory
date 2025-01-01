const inventoryContainer = document.getElementById('inventory-container');
const form = document.getElementById('add-item-form');

const API_URL = 'http://localhost:3000/api/inventory';
let inventory = []; // Declare at the top of the script

// Fetch and display inventory
async function fetchInventory() {
    const response = await fetch(API_URL);
    inventory = await response.json(); // Update the global variable
    inventoryContainer.innerHTML = inventory.map(item =>
        `<div>
            ${item.item} - ${item.quantity} (${item.unit})
            <button onclick="deleteItem(${item.id})">Delete</button>
            <button onclick="editItem(${item.id})">Edit</button>
        </div>`
    ).join('');
}

// Add a new item
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page

    const newItem = {
        item: document.getElementById('item-name').value,
        quantity: parseInt(document.getElementById('item-quantity').value, 10),
        unit: document.getElementById('item-unit').value
    };

    // Send the new item to the backend
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        form.reset(); // Clear the form fields
        fetchInventory(); // Refresh the inventory list
    } else {
        console.error('Failed to add item:', await response.text());
    }

    console.log(newItem);
});

// Delete an item
async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchInventory();
}

// Edit an item
async function editItem(id) {
    const newName = prompt('Enter new name:');
    const newQuantity = prompt('Enter new quantity:');
    const newunit = prompt('Enter new unit:');
    if (newName && newQuantity && newunit) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                item: newName,
                quantity: parseInt(newQuantity),
                unit: newunit
            })
        });
        fetchInventory();
    }
}

// Initial fetch
fetchInventory();
