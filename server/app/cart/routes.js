const router = require('express').Router();
const { police_check } = require('../../middleware');
const cartController = require('./controller');

router.get(
    '/cart',
    police_check('read', 'Cart'),
    cartController.getCart
);
router.put(
    '/cart',
    police_check('update', 'Cart'),
    cartController.updateCart
)

module.exports = router;