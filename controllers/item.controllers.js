const Item = require('../models/item.model')


const fetchItems = async (req, res) => {
    let filters = {}

    console.log('oten')

    if (req.query.search) { // Check if search key is passed
        filters['name'] = {$regex: req.query.search, $options: 'i'}
    }

    if (req.query.date) { // Check if date params is passed
        const start = new Date(req.query.date);
        let end = new Date(req.query.date)
        end = end.setDate(end.getDate() + 1); // Add one day so we range of one day when querying
        filters['createdAt'] = {$gte:start,$lt:end}
    }

    try {
        const count = await Item.countDocuments(filters);
        const items = await Item.find(filters)
        .sort({_id:-1})

        res.status(200).json({items, count});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
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
};

const deleteItem = async (req, res) => {
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
};

module.exports = {
    fetchItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}
