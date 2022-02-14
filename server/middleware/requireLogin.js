const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const User = mongoose.model("USER")

// dotenv.config({ path: "./config" })
require("../config/keys")
module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorization == affhffuhfhga
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ","")
    

    
    
   
    jwt.verify(token, process.env.SECRET_KEY, (err,payload) => {
        
        
        if(err){
            
            return res.status(401).json({ error: "youu must be logged in " })
        }
        const {_id} = payload
        
        User.findById(_id).then(userSchema => {
            
            req.user = userSchema
            
            
            next()

        })
     
    })

}
