const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database'); // Import the database
const PORT = 3000;

app.use(express.json());

// Enable CORS
app.use(cors());

// Get all inventory items
app.get('/api/inventory', (req, res) => {
    db.all('SELECT * FROM inventory', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new item
app.post('/api/inventory', (req, res) => {
    const { item, quantity, unit } = req.body;
    db.run(`INSERT INTO inventory (item, quantity, unit) VALUES (?, ?, ?)`,
        [item, quantity, unit],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID, item, quantity, unit });
            }
        });
});

// Update an item
app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    const { item, quantity, unit } = req.body;
    db.run(`UPDATE inventory SET item = ?, quantity = ?, unit = ? WHERE id = ?`,
        [item, quantity, unit, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json({ id, item, quantity, unit });
            }
        });
});

// Delete an item
app.delete('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM inventory WHERE id = ?`, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(204).send();
        }
    });
});

app.listen(443, () => console.log(`Server running on http://localhost:3000`));
