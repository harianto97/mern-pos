const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { police_check } = require('../../middleware');

const productController = require('./controller');

router.post('/product',
    multer({ dest: os.tmpdir() }).single('image'),
    police_check('create', 'Product'),
    productController.addProduct
);
router.get('/product', productController.getProduct);
router.get('/product/:id', productController.getProductById);
router.put('/product/:id',
    multer({ dest: os.tmpdir() }).single('image'),
    police_check('update', 'Product'),
    productController.updateProduct
);
router.delete('/product/:id',
    police_check('delete', 'Product'),
    productController.deleteProduct
);

module.exports = router;