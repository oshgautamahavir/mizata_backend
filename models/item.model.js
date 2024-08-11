const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter item name']
        },

        description: {
            type: String,
            default: ''
        },

        quantity: {
            type: Number,
            required: [true, 'Please enter quantity']
        },

        price: {
            type: Number,
            required: [true, 'Please enter price']
        },

        status: {
            type: Number,
            default: 0
        },

        image: {
            type: String,
            requried: false
        }
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;