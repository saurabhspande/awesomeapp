const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt  = require('jsonwebtoken');


require("../db/conn");
const User = require("../model/userSchema");
const requireLogin = require("../middleware/requireLogin");
require("../model/post");

router.get("/",requireLogin, (req, res) => {
    res.send("hello user");
})
// Using promisses 
// router.post("/register",(req,res)=>{
//    const {name, email, phone, password, cpassword} = req.body;

//    if(!name ||  !email ||  !phone ||  !password ||  !cpassword){
//        return res.status(422).json({error : "plz fill all the fields"})
//    }

//    User.findOne({email:email}).then((userExist)=>{
//        if(userExist){
//             return res.status(422).json({error:"Email already exist" });
//        }
//        const user = new User({name, email, phone, password, cpassword });

//        user.save().then(()=>{
//            res.status(201).json({message:"registration successful"});
//        }).catch((err)=>{
//            res.status(500).json({error:"failed to register"})
//        })
//    }).catch(err =>{console.log(err)});
// })

// *******************usig async await *******************************
router.post("/register", async (req, res) => {
    const { name, email,phone,password,cpassword} = req.body;

    if (!name || !email || !phone || !password || !cpassword ) {
        return res.status(422).json({ error: "plz fill all the fields" })
    }

    try {


        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } 
         else {
            const user = new User({ name, email,phone, password,cpassword});

            const userRegister = await user.save()

            if (userRegister) {
                res.status(201).json({ message: "registration successful" });
            } else {
                res.status(500).json({ error: "failed to register" })
            }
        }




    } catch (err) {
        console.log(err)
    }

});

// login route with form validation

router.post("/signin", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "plz fill all the fields" })
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            if (!isMatch) {
                 res.status(400).json({ error: "invalid Credientials " })
            } else {
                const {_id, name,email} = userLogin
                res.json({ message: "user signin successfully" ,token,user:{_id,name,email}});

            }

        } else {
             res.status(400).json({ error: "invalid Credientials" })
        }

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;