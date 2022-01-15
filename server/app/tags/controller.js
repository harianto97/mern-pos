const Tags = require('./model');

const addTags = async (req, res, next) => {
    try {
        let payload = req.body;
        let tag = new Tags(payload);
        await tag.save();
        return res.json(tag);
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

const getTags = async (req, res, next) => {
    try {
        let tag = await Tags.find();
        return res.json(tag);
    } catch (err) {
        next(err);
    }
}

const getTagsById = async (req, res, next) => {
    try {
        let tag = await Tags.findById(req.params.id);
        return res.json(tag);
    } catch (err) {
        next(err);
    }
}

const updateTags = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        let tag = await Tags.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        });
        return res.json(tag);
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

const deleteTags = async (req, res, next) => {
    try {
        let tag = await Tags.findByIdAndDelete(req.params.id);
        return res.json(tag);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addTags,
    getTags,
    getTagsById,
    updateTags,
    deleteTags,
}