const express = require('express');
const axios = require('axios');
const multer = require('multer');
const sharp = require('sharp');
const { openCage, yelp, ipGeolocation } = require('./env-keys');
const User = require('./models/User');
const auth = require('./middleware/auth');
const algorithm = require('./algorithm');
const getGFBiz = require('./getGFBiz');

const router = new express.Router();

router.get('/', (req, res) => {
  res.send('This is the root response!');
});

router.get('/getClientLocation', async (req, res) => {
  let ipaddress = req.ip;
  if (ipaddress === '::1' || ipaddress.includes('192.168.32')) {
    // Random IP for development
    ipaddress = '64.94.159.111';
  }
  try {
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeolocation}&ip=${ipaddress}`
    );
    res.send({
      latitude: response.data.latitude,
      longitude: response.data.longitude,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
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

const YELP_API_KEY = yelp;

router.get('/yelp', async (req, res) => {
  let lat = req.query.latitude;
  let lng = req.query.longitude;
  let searchbox = req.query.searchbox;
  const options = {
    headers: { Authorization: `Bearer ${YELP_API_KEY}` },
  };
  const response = await axios.get(
    `https://api.yelp.com/v3/businesses/search?term=${searchbox}&latitude=${lat}&longitude=${lng}`,
    options
  );
  let data = response.data.businesses;
  for (let i = 0; i < data.length; i++) {
    let newObject = {
      name: data[i].name,
      coordinates: data[i].coordinates,
      location: data[i].location.display_address,
      image: data[i].image_url,
      price: data[i].price,
      phone: data[i].phone,
      categories: data[i].categories,
      id: data[i].id,
    };
    data[i] = { ...newObject };
  }
  let coords = {
    latitude: lat,
    longitude: lng,
  };
  console.log(data);
  data = await algorithm(data, coords);
  res.send(data);
});

router.get('/yelp/business/:id', async (req, res) => {
  const options = {
    headers: { Authorization: `Bearer ${YELP_API_KEY}` },
  };
  const inGFDB = await getGFBiz(req.params.id);
  if (inGFDB.length) {
    res.send(inGFDB[0]);
  } else {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${req.params.id}`,
      options
    );
    res.send(response.data);
  }
});

/* Routes for user requests */

// Create a new user - signup
router.post('/users', async (req, res) => {
  console.log('This is the /users post route');
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Authenticate an existing user - login
router.post('/users/login', async (req, res) => {
  try {
    // find the user
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // check if they are admin
    console.log(user);
    if (user.admin) {
      throw new Error('The user is an admin!!!');
    }
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Log a single user out on one device
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(201).send({ text: 'Success' });
  } catch (e) {
    res.status(500).send();
  }
});

// Fetch uuid and avatar for auth user
router.post('/fetchUser', auth, (req, res) => {
  const returnMe = {};
  returnMe['uuid'] = req.user._id;
  returnMe['avatar'] = req.user.avatar;
  res.send(returnMe);
});

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

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({ status: 'It was a huge success' });
  },
  (error) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send({ status: 'successful delete!' });
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
