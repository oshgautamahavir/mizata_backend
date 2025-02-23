const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const itemRoute = require('./routes/item.routes')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/items', itemRoute)

mongoose.connect('mongodb://localhost:27017/mizatadb');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function() {
        console.log('Connected to MongoDB!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
