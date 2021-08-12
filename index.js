const express = require('express');
const cors = require('cors');
const app = express();
const PORT =process.env.PORT || 5000;
const route = require("./routes/routes");
const config = require('config');

require('./dbConfig/dbConnect')

app.use(cors());
app.use(express.json());
app.use("/api", route);


const secret = config.get('jwtPrivateKey.secret');
if (!secret) {
    console.log("FATAL ERROR: jwt secret not specified");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})