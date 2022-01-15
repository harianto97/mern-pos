const router = require('express').Router();
const deliveryAddressController = require('./controller');
const { police_check } = require('../../middleware');

router.post(
    '/delivery-address', 
    police_check('create', 'DeliveryAddress'), 
    deliveryAddressController.addAddress
);
router.get('/delivery-address',
    police_check('view', 'DeliveryAddress'),
    deliveryAddressController.getAddress
);
router.put(
    '/delivery-address/:id',
    deliveryAddressController.updateAddress
);
router.delete(
    '/delivery-address/:id',
    deliveryAddressController.deleteAddress
);

module.exports = router;