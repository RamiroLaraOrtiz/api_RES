import User from "../models/user";
import jwt  from "jsonwebtoken";
import config from "../config";
import Role from "../models/role"
export const singUp = async (req,res)=>{

    const {username,email,password,roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    if (roles) {
        const foundRoles = await Role.find({name: {$in:roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    console.log(savedUser);
    const token = jwt.sign({id:savedUser._id,email:savedUser.email,username:savedUser.username},config.SECRET,{
        expiresIn:86400 //24 hours 
    })
    
    res.status(200).json({token})
}  

export const singIn = async (req,res)=>{
    const userFound = await User.findOne({email:req.body.email}).populate("roles")

    if (!userFound) return res.status(400).json({message:"User not Found"})
    console.log(userFound)

    const matchPassword = await User.comparePassword(req.body.password,userFound.password)
    
    if(!matchPassword) return res.status(401).json({token:'NULL',message:"Invalid Password"})
    const token = jwt.sign({id:userFound._id,email:userFound.email,username:userFound.username,roles:userFound.roles},config.SECRET,{
        expiresIn:86400 //24 hours 
    })
    res.json({token:token})
}