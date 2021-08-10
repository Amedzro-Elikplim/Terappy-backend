const mongoose = require("mongoose");
const config = require('config');

mongoose
  .connect(config.get('dbConfig.connect'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongoDB successfully"))
  .catch((error) => console.error(error));
