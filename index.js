const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const route = require("./routes/userRoutes");

require('./dbConfig/dbConnect')

app.use(cors());
app.use(express.json());
app.use("/api", route);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})