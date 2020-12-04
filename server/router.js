const express = require('express');
const axios = require('axios');
const multer = require('multer');
const { openCage, ipGeolocation, googleMapsKey } = require('./env-keys');
const auth = require('./middleware/auth');

const router = new express.Router();

// My Services
const LocationService = require('./services/LocationService');
const LocationServiceInstance = new LocationService();

const UserController = require('./controllers/UserController');
const UserControllerInstance = new UserController();

const BusinessController = require('./controllers/BusinessController');
const BusinessControllerInstance = new BusinessController();

router.get('/', (req, res) => {
  res.send('This is the root response!');
});

router.get('/googleMapsKey', (req, res) => {
  res.send(googleMapsKey);
})

router.get('/getClientLocation', async (req, res) => {
  try {
    const result = await LocationServiceInstance.client(req.ip);
    return res.send({ latitude: result.body.data.latitude, longitude: result.body.data.longitude });
  }
  catch(e) {
    res.status(500).send(e);
  }
});

router.get('/forwardgeocode', async (req, res) => {
  console.log('This runs here line 10!');
  const { location, lat, lng } = req.query;
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${location}&proximity=${lat},${lng}&key=${openCage}`
    );
    res.send(response.data.results[0].geometry);
  } catch (e) {
    res.status(500).send();
  }
});


router.get('/yelp', BusinessControllerInstance.query);

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
