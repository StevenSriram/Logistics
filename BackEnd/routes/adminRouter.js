const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminRouter = express.Router();

// mongoose Modal
const AdminModal = require('../modals/AdminModal')

// Admin GET
adminRouter.get('/', async (req, res) => {
    const items = await AdminModal.find()
    res.json(items)
});

// MiddleWare for AdminVerifiaction
const verifyAdmin = (req, res, next) => {
    // get adminToken Stored in Cookies
    const adminToken = req.cookies.adminToken
    if(!adminToken)
    {
        return res.json({msg: "adminToken NOT Available"})
    }
    else
    {
        jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
            if(err)
                return res.json({msg: "WRONG adminToken"})

            // return back to Dashboard Route
            req.admin = decoded
            next()
        })
    }
}

// Admin Authorization GET
adminRouter.get("/dashboard", verifyAdmin, (req,res) => {
    
    return res.json({msg: "Access Grant", admin: req.admin})
})


// Admin login POST
adminRouter.post("/login" , async (req,res) => {
    try {
        const {email, pass} = req.body

        // check for Admin Exits
        const adminExists = await AdminModal.findOne({email})
        if(!adminExists || !(await bcrypt.compare(pass, adminExists.pass)))
        {
           return res.json({msg: "Invalid AdminName and Passsword"})
        }
        else
        {
            // Json Web adminToken
            const adminToken = jwt.sign({ AdminId: adminExists._id,
                email: adminExists.email, name: adminExists.name
            },
                process.env.ADMIN_JWT_SECRET ,
                { expiresIn: '1d'}
            )
            res.cookie('adminToken', adminToken , {httpOnly: true})
           return res.json({msg: "Login Success",
            admin: { email: adminExists.email, name: adminExists.name}
            })
        }    
    } 
    catch (err) {
        console.error(err)
        return res.status(500).json({msg: "Error Logining Admin"})
    }
})


// Admin register POST
adminRouter.post("/register" , async (req,res) => {
    try 
    {
        const {name, email, pass} = req.body

        // check for Admin already Exits
        const adminExists = await AdminModal.findOne({email})
        if(adminExists)
        {
           return res.json({msg: "Admin Already Exits"})
        }

        // hash Password for Security
        const hashPass = await bcrypt.hash(pass, 10)

        // create Mongoose Schema
        const newAdmin = new AdminModal({
            name,
            email,
            pass: hashPass
        })

        /* 
            when insert __V: keeps track the Version of Document 
        */
        // insert into Modal
        await newAdmin.save()
        return res.status(201).json({msg: "Admin Registration Success"})
    } 
    catch (err) 
    {
        console.error(err)
        return res.status(500).json({msg: "Error Registering Admin"})
    }
})

// Admin logout POST
adminRouter.post('/logout', (req, res) => {
    res.cookie('adminToken', '', { httpOnly: true, maxAge: 0, path: '/' });
    return res.status(200).json({ msg: 'Logged out successfully' });
});

module.exports = adminRouter;