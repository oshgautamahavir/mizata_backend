const express = require('express');
const mongoose = require('mongoose');

const app = express();

const itemRoute = require('./routes/item.routes')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/items', itemRoute)

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
