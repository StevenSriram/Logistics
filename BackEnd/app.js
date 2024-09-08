const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// mongooose model
const UserModal = require('./modals/UserModal')

// router
const userRouter = require('./routes/userRouter')

const app = express();
// JSON response
app.use(express.json())
// cookieParser for http-only-cookie
app.use(cookieParser())
// Cross Origin Resource Sharing
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}))
// routes handler
app.use('/api', userRouter)

// Mongo DataBase Connection
const url = process.env.MONGOOSE_URL
mongoose.connect(url)
.then(() => { console.log("DataBase Connected" )})
.catch(() => console.error("Error Occured"))


// listen to port
const port = process.env.PORT || 3000
app.listen(port, (err) => {
    console.log(`Server started at http://localhost:${port}`);
});
