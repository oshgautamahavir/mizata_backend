const Item = require('../models/item.model')

const fetchItems = async (req, res) => {
    const searchKey = req.query.search

    try {
        const items = await Item.find({name: {$regex: searchKey, $options: 'i'}}).sort({_id:-1});
        res.status(200).json(items);
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
