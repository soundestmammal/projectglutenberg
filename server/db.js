const mongoose = require('mongoose');
const { mongoDBConnection } = require('./env-keys');
mongoose.connect(mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB Connected!");
})
.catch((err) => {
    console.log(err);
});