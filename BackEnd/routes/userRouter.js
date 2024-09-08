const express = require('express');
const bcrypt = require('bcryptjs')

const userRouter = express.Router();

// mongoose Modal
const UserModal = require('../modals/UserModal')

// user GET
userRouter.get('/', async (req, res) => {
    const items = await UserModal.find()
    res.json(items)
});


// user login POST
userRouter.post("/login" , async (req,res) => {
    try {
        console.log(req.body)
        const {email, pass} = req.body

        // check for user Exits
        const userExits = await UserModal.findOne({email})
        if(!userExits || !(await bcrypt.compare(pass, userExits.pass)))
        {
           return res.json({msg: "Invalid UserName and Passsword"})
        }

        // Json Web Token
        
    } 
    catch (err) {
        console.error(err)
        return res.status(500).json({msg: "Error Logining User"})
    }
})


// user register POST
userRouter.post("/register" , async (req,res) => {
    try 
    {
        console.log(req.body)
        const {name, email, pass} = req.body

        // check for user already Exits
        const userExits = await UserModal.findOne({email})
        if(userExits)
        {
           return res.json({msg: "User Already Exits"})
        }

        // hash Password for Security
        const hashPass = await bcrypt.hash(pass, 10)

        // create Mongoose Schema
        const newUser = new UserModal({
            name,
            email,
            pass: hashPass
        })

        /* 
            when insert __V: keeps track the Version of Document 
        */
        // insert into Modal
        await newUser.save()
        return res.status(201).json({msg: "User Registration Success"})
    } 
    catch (err) 
    {
        console.error(err)
        return res.status(500).json({msg: "Error Registering User"})
    }
})


module.exports = userRouter;