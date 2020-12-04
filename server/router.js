const express = require('express');
const multer = require('multer');
const { googleMapsKey } = require('./env-keys');
const auth = require('./middleware/auth');

const router = new express.Router();

const UserController = require('./controllers/UserController');
const UserControllerInstance = new UserController();

const BusinessController = require('./controllers/BusinessController');
const BusinessControllerInstance = new BusinessController();

const LocationController = require('./controllers/LocationController');
const LocationControllerInstance = new LocationController();

router.get('/', (req, res) => {
  res.send('This is the root response!');
});

router.get('/googleMapsKey', (req, res) => {
  res.send(googleMapsKey);
})


/* Location API Endpoints */

// Get's the client location
router.get('/getClientLocation', LocationControllerInstance.getClientLocation);

// Performs Forward Geocode
router.get('/forwardgeocode', LocationControllerInstance.forwardGeocode);


/* Business API Endpoints */

// Query a list of restaurants
router.get('/yelp', BusinessControllerInstance.query);

// Fetch a business by id
router.get('/yelp/business/:id', BusinessControllerInstance.getBusinessByID);


/* User API Endpoints */

// Create a new user - signup
router.post('/users', UserControllerInstance.createUser);

// Authenticate an existing user - login
router.post('/users/login', UserControllerInstance.loginUser);

// Log a single user out on one device
router.post('/users/logout', auth, UserControllerInstance.logoutUser);

// Fetch uuid and avatar for auth user
router.post('/fetchUser', auth, UserControllerInstance.fetchUser);

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)/)) {
      return cb(new Error('Upload a valid file type'));
    }
    cb(undefined, true);
  },
});

router.post('/users/me/avatar', auth, upload.single('avatar'), UserControllerInstance.uploadAvatar);

router.delete('/users/me/avatar', auth, UserControllerInstance.deleteAvatar);

router.get('/users/:id/avatar', UserControllerInstance.getAvatar);

router.delete('/users/me', auth, UserControllerInstance.deleteAccount);

module.exports = router;
