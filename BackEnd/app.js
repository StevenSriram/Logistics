const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Node");
});

app.listen(port, (err) => {
    console.log(`Server started at http://localhost:${port}`);
});
