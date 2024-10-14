const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const stripe = require('stripe')(process.env.SECRET_KEY)

const userRouter = express.Router();

// mongoose Modal
const UserModal = require('../modals/UserModal')

// userRouter.post("/checkout-session", async (req, res) => {
//     const {company, image, totalAmount} = req.body
//     // console.log(company, image, totalAmount)

//     const lineItems =[
//         {price_data: {
//             currency: "usd",
//             product_data: {
//                 name: company,
//                 images: image,
//             },
//             unit_amount: Math.round(totalAmount * 100)
//         }}
//     ]

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: "http:/localhost:5500/",
//         cancel_url: "http:/localhost:5500/booking"
//     })
//     return res.json({id: session.id})
// })

// user GET

userRouter.post("/checkout-session", async (req, res) => {
    const { company, image, totalAmount } = req.body;

    const lineItems = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: company,
                    images: [image], 
                },
                unit_amount: Math.round(totalAmount * 100),
            },
            quantity: 1, 
        }
    ];

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:5500/",
            cancel_url: "http://localhost:5500/booking",
        });

        return res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


userRouter.get('/', async (req, res) => {
    const items = await UserModal.find()
    res.json(items)
});

// MiddleWare for userVerifiaction
const verifyUser = (req, res, next) => {
    // get token Stored in Cookies
    const token = req.cookies.token
    if(!token)
    {
        return res.json({msg: "Token NOT Available"})
    }
    else
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err)
                return res.json({msg: "WRONG Token"})

            // return back to welcome Route
            next()
        })
    }
}

// user Authorization GET
userRouter.get("/welcome", verifyUser, (req,res) => {
    
    return res.json({msg: "Access Grant"})
})


// user login POST
userRouter.post("/login" , async (req,res) => {
    try {
        // console.log(req.body) 
        const {email, pass} = req.body

        // check for user Exits
        const userExits = await UserModal.findOne({email})
        if(!userExits || !(await bcrypt.compare(pass, userExits.pass)))
        {
           return res.json({msg: "Invalid UserName and Passsword"})
        }
        else
        {
            // Json Web Token
            const token = jwt.sign({ userId: userExits._id },
                process.env.JWT_SECRET ,
                { expiresIn: '1d'}
            )
            res.cookie('token', token , {httpOnly: true})
           return res.json({msg: "Login Success"})
        }
        
        
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
        // console.log(req.body)
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

// User logout POST
userRouter.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true, maxAge: 0, path: '/' });
    return res.status(200).json({ msg: 'Logged out successfully' });
});

module.exports = userRouter;