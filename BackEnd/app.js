const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// module
const UserModal = require('./modals/UserModal')

const app = express();
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/Logistics')
.then(() => { console.log("DataBase Connected" )})
.catch(() => console.error("Error Occured"))

app.get('/', async (req, res) =>{
    const items = await UserModal.find()
    res.json(items)
})

app.listen(process.env.PORT || 3000, (err) => {
    console.log(`Server started at http://localhost:${process.env.PORT || 3000}`);
});
