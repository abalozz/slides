var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var isOwner = require('../middlewares/is-owner');

var homeController = require('../controllers/home');
var authController = require('../controllers/auth');
var userController = require('../controllers/user');
var keynoteController = require('../controllers/keynote');
var slideController = require('../controllers/slide');


router.get('/', homeController.home);

router.get('/auth/twitter', authController.twitter.authenticate);
router.get('/auth/twitter/callback', authController.twitter.callback, authController.redirectToProfile);
router.get('/logout', auth, authController.logout);

router.get('/@:user', userController.getUser);
router.get('/profile', userController.showProfile);
router.post('/profile', userController.updateProfile);


router.post('/new', auth, keynoteController.create);
router.get('/@:user/:keynote', keynoteController.show);
router.get('/@:user/:keynote/edit', auth, isOwner, keynoteController.edit);
router.post('/keynote/:keynoteId/update', auth, keynoteController.update);
router.post('/keynote/:keynoteId/remove', auth, keynoteController.remove);

router.post('/slide/new', auth, slideController.create);
router.post('/slide/:slideId/update', auth, slideController.update);
router.post('/slide/:slideId/remove', auth, slideController.remove);

router.get('/@:user/:keynote/live', keynoteController.showLive);
router.get('/@:user/:keynote/controls', auth, keynoteController.showControls);


module.exports = router;
