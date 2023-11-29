let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken');
let Users = require('../Models/User');
let validator = require('validator');

function validate(password) {
    let minMaxLength = /^[\s\S]{8,32}$/;
    let upper = /[A-Z]/;
    let lower = /[a-z]/;
    let number = /[0-9]/;

    if (minMaxLength.test(password) && upper.test(password) &&
        lower.test(password) && number.test(password)
    ) {
        return true;
    }
    return false;
};

//REGISTER USER
router.post('/register/user', async (req,res) => {
    try {
        const {name,email,password,age,phone} = req.body;
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        if(validator.isEmail(email) !== true ) {
            return res.status(400).json({ message: 'This is not an email address' })
        }
        if(validate(password) !== true) {
            return res.json({ message: 'Password is to weak.' })
        }
        //Check if the user already exist or not
        const userExist = await Users.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = new Users(req.body)
        await user.save()
        res.status(201).send({user})

    } catch (err) {
        return res.json({error : err})
    }

})

router.post('/login/user',async function (req,res) {
    try {
        const { email, password } = req.body;
        //Check emptyness of the incoming data
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        if(validator.isEmail(email) !== true ) {
            return res.json({ message: 'This is not an email address' })
        }
        //Check if the user already exist or not
        const userExist = await Users.findOne({email:req.body.email});
        if(!userExist){
            return res.status(400).json({message:'Wrong credentials'})
        }
        //Check password match
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.json({message:'Wrong credentials pass'});
        }
        const token = await jwt.sign({ id: userExist._id}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.cookie("token",token).json({success:true,message:'LoggedIn Successfully'}).status(200);
    } catch (error) {
        return res.json({ error: error });
    }

});

router.post('/reset-password/', async function (req,res) {

});




module.exports = router;