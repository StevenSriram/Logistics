const express = require('express');
const userRoute = require('./routes/userRoutes')

// dotEnv
require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();

app.use('/', userRoute)

app.listen(port, (err) => {
    console.log(`Server started at http://localhost:${port}`);
});
