const {Router} = require('express')
const User =  require('../models/user')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../middelwere/auth.middelwere')
require('dotenv').config()


const router = Router()
let refreshTokens = []  

 // /api/auth/register
router.post(
    '/signup',
    [
        check('email', 'Email is not corect').isEmail(),
        check('password', 'password will have 6 symbol')
            .isLength({min:6})

    ],
    async(req, res)=>{
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'data for register is not corect'
                })
            }


            const{email, username, password, bio } =  req.body
            
            
            const candidate = await User.findAll({
                where: {
                    email
                }
              })

            if(candidate.length){
                return res.status(400).json({message:'This user is register'})
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = await User.create({
                email,
                username,
                password:hashPassword,
                bio
            }).catch( (err) => {
                return res.status(400).json({message:'user is not save'})
            });
            
            const token = await jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
          
            return res.status(201).json({message:'all fine', token, id:user.id})
           
        } catch(e){
            res.status(500).json({message: "You have problem! Restart app!"})
        }
    })

//  /api/auth/login
router.post('/login', 
    [
        check('email', 'Email is not corect').isEmail(),
        check('password', 'password will have 6 symbol')
            .isLength({min:6})

    ],  
    async(req, res)=>{
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'data for register is not corect'
                })
            }


            const{email, password } =  req.body

            const candidate = await User.findAll({
                where: {
                    email
                }
            })
            
            const flag = await bcrypt.compareSync(password, candidate[0].password)
            if(flag){
                const token = await jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
                return res.status(200).json({message:'all fine',token, id:candidate[0].id})
            }else{
                return res.status(400).json({message:'data is not corect'})
            }

            

        } catch(e){
            res.status(500).json({message: "You have problem! Restart app!"})
        }
})


router.get('/:id',
    auth,   
    async(req, res)=>{
        try {
            console.log(req.email.email)
            const candidate = await User.findAll({
                where: {
                    id:req.params.id,
                    email:req.email.email
                }
            })
            
            const {email, username, bio } = candidate[0]
            return res.status(200).json({email, username, bio })
        } catch(e){
            res.status(500).json({message: "You have problem! Restart app!"})
        }
})


module.exports = router