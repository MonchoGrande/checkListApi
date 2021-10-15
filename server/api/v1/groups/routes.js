const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model')

router.route('/')
  .post(auth, sanitizers, controller.create)
  .get(auth, controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth,owner,sanitizers,controller.update)
  .delete(auth,owner, controller.delete);

module.exports = router;
