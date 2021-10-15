const router = require('express').Router();
const taskRouter = require('../tasks/routes');
const controller = require('./controller');
const { me, auth } = require('../auth');
const {sanitizers}=require('./model')

router.param('id', controller.id);

router.route('/').get(controller.all);
router.route('/signup').post(sanitizers,controller.signup);
router.route('/signin').post(sanitizers, controller.signin);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me,sanitizers, controller.update)
  .delete(auth, me,controller.delete);

router.use('/:userId/tasks', taskRouter);

module.exports = router;
