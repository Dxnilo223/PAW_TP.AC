const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://dannyalramos06_db_user:<PAW_TP.AC>@paw.trofioj.mongodb.net/?appName=PAW';

mongoose.connect(MONGO_URI).then((res) => {
  console.log("conected to db!");
  console.log("http://localhost:3000");
});