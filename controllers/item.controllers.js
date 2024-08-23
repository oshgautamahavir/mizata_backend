const Item = require('../models/item.model')

const SIZE_PER_REQUEST = 10; // Number of items to return

const fetchItems = async (req, res) => {
    const searchKey = req.query.search
    const top = parseInt(req.query.top) || 0;  // Number of items to skip or where to start
    const bottom = SIZE_PER_REQUEST + top;

    try {
        const count = await Item.countDocuments({});
        console.log(count)
        const items = await Item.find({name: {$regex: searchKey, $options: 'i'}})
        .sort({_id:-1})
        .skip(top)
        .limit(bottom);

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
