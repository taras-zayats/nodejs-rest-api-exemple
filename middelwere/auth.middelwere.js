const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports =  function (req, res, next){
    if(req.method === "OPTIONS"){
        return next()
    }
    
    try{
        if(!req.headers.authorization){
            return res.json(401).json({message:'User does`nt authorization'})
        }
        
        emailToken = req.headers.authorization
        const token = emailToken && emailToken.split(' ')[1]
        if(token == null) {
            return  res.json(401).json({message:'User does`nt authorization'})
        } 

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
            if(err){
                return  res.json(403).json({message:'User does`nt authorization'})
            }

            req.email = email
            next()
        })
    
        
    }catch(e){
        return  res.json(401).json({message:'User does`nt authorization'})
    }
}