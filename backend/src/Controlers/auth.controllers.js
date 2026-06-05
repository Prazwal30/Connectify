import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

const cookieOptions = {
httpOnly:true,
sameSite:process.env.NODE_ENV==="production" ? "none" : "lax",
secure:process.env.NODE_ENV==="production",
path:"/",
};

export async function signin(req, res) {

    const { password, fullName } = req.body;
    const email = req.body.email?.trim().toLowerCase();
   
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Please provide a valid email address"});
    }
const existinguser=await User.findOne({email});
if(existinguser){
    return res.status(400).json({message:"email already exists"});
}
const idx= Math.floor(Math.random()*100)+1;
const randomavatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${idx}`;
const newUser = await User.create({
    fullName,
    email,
    password,
    profilepic: randomavatar,
 
});
try{
    await upsertStreamUser({
        id:newUser._id.toString(),
        name:newUser.fullName,
        image:newUser.profilepic||"",
    });

console.log(`stream user created ${newUser.fullName}`);
}catch(error){
    console.error("Error creating stream user:", error);
}

const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("jwt", token, {
maxAge: 7*24*60*60*1000,
...cookieOptions,
    })
    res.status(201).json({message:"User created successfully", user:newUser});
    }catch(error){
 console.error("Error in signin:", error);
 res.status(500).json({message:"Internal server error"});
    }
}


export function signinPage(req, res) {
    res.send("signin route");
}

export async function login(req, res) {
   const { password } = req.body;
   const email = req.body.email?.trim().toLowerCase();
   try{
    if(!email||!password){
        return res.status(400).json({message:"Please provide email and password"});
    }
    if (password.length<6)
{
    return res.status(400).json({message:"Password must be at least 6 characters long"});
}   
const user=await User.findOne({email});
if(!user){
    return res.status(400).json({message:"Email is incorrect"}); 

}
const ispasswordCorrect=await user.comparePassword(password);
if(!ispasswordCorrect){
    return res.status(400).json({message:"Password is incorrect"}); 
}



await user.save();
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("jwt", token, {
maxAge: 7*24*60*60*1000,
...cookieOptions,
    })
    res.status(201).json({message:"User logged in successfully", user:user});
    }catch(error){
 console.error("Error in login:", error);
 res.status(500).json({message:"Internal server error"});
    }
}



export  function logout(req, res) {
   res.clearCookie("jwt", cookieOptions);
   res.status(200).json({message:"Logged out successfully"});  
}
export async function updateProfile(req,res){
    try{
        const userID=req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location,profilepic}=req.body;
        if (
            !fullName?.trim() ||
            !bio?.trim() ||
            !nativeLanguage?.trim() ||
            !learningLanguage?.trim() ||
            !location?.trim() ||
            !profilepic?.trim()
        ) {
            return res.status(400).json({message:"All fields are required"});
        }
        const updatedFields = {fullName,bio,nativeLanguage,learningLanguage,location,profilepic,isOnboarded:true};

        Object.keys(updatedFields).forEach((key) => {
            if (updatedFields[key] === undefined) delete updatedFields[key];
        });

    if(Object.keys(updatedFields).length === 0){
  return res.status(400).json({message:"Please provide at least one field to update"});
    }
const updateduser=await User.findByIdAndUpdate(userID,updatedFields,{new:true});
if(!updateduser){    return res.status(404).json({message:"User not found"});
}
try{
await upsertStreamUser({
    id:updateduser._id.toString(),
    name:updateduser.fullName,
    image:updateduser.profilepic||"",
});
console.log(`stream user updated ${updateduser.fullName}`);
}
catch(streamerror)
{
console.log("Error updating stream user:", streamerror.message);
}

res.status(200).json({message:"User updated successfully",user:updateduser});



}catch(error){
    console.error("Error in updateProfile:", error);
    res.status(500).json({message:"Internal server error"});
}

}
