const Categories = require('./model');

const addCategory = async (req, res, next) => {
    try {
        let payload = req.body;
        let category = new Categories(payload);
        await category.save();
        return res.json(category);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }
        next(err);
    }
}

const getCategory = async (req, res, next) => {
    try {
        let category = await Categories.find();
        return res.json(category);
    } catch (err) {
        next(err);
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        let category = await Categories.findById(req.params.id);
        return res.json(category);
    } catch (err) {
        next(err);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        let category = await Categories.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        });
        return res.json(category);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }
        next(err);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        let category = await Categories.findByIdAndDelete(req.params.id);
        return res.json(category);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
}