const router = require('express').Router();
const categoryController = require('./controller');
const {police_check} = require('../../middleware');

router.post('/category',
    police_check('create', 'Category'),
    categoryController.addCategory
);
router.get('/category',categoryController.getCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id',
    police_check('update', 'Category'),
    categoryController.updateCategory
);
router.delete('/category/:id',
    police_check('delete', 'Category'),
    categoryController.deleteCategory
);

module.exports = router;