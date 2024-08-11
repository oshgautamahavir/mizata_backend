const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item.model')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// create an item
app.post('/api/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update an item
app.put('/api/item/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndUpdate(id, req.body);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const updatedItem = await Item.findById(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete an item
app.delete('/api/item/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found'});
        }

        res.status(200).json({ message: 'Item is deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get item by id
app.get('/api/item/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect('mongodb+srv://oshgautamahavir:puXvGyNasiX8Kn8A@mizatadb.ru9n0.mongodb.net/?retryWrites=true&w=majority&appName=MizataDB');
// .then(() => {
    //     console.log('Connected to the database');
    // })
    // .catch(() => {
        //     console.log('Connection failed')
        // });
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error:'));
        db.once('open', function() {
            console.log('Connected to MongoDB!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
