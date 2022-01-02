const GrammarController = require('../app/controllers/GrammarController');
const siteController = require('../app/controllers/SiteController');
const express = require('express');
const router = express.Router();

router.get('/create', GrammarController.create);
router.post('/store', GrammarController.store);
router.get('/:id/edit', GrammarController.edit);
router.put('/:id', GrammarController.update);
router.get('/grammar', siteController.grammar);
// router.delete('/:id', GrammarController.destroy);
router.get('/:id', GrammarController.show);
module.exports = router;
