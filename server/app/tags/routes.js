const router = require('express').Router();
const tagsController = require('./controller');
const {police_check} = require('../../middleware');

router.post('/tags',
    police_check('create', 'Tags'),
    tagsController.addTags
);
router.get('/tags', tagsController.getTags);
router.get('/tags/:id', tagsController.getTagsById);
router.put('/tags/:id',
    police_check('update', 'Tags'),
    tagsController.updateTags
);
router.delete('/tags/:id',
    police_check('delete', 'Tags'),
    tagsController.deleteTags
);

module.exports = router;