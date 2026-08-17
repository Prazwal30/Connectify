import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

const cookieOptions = {
maxAge: 7*24*60*60*1000,
httpOnly:true,
sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
secure:process.env.NODE_ENV==="production",
};

export async function signin(req, res) {

    const { email, password, fullName } = req.body;
   
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
const randomavatar = `https://avatar.iran.liara.run/public/${idx}.png`;
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
res.cookie("jwt", token, cookieOptions)
    res.status(201).json({message:"User created successfully", user:newUser, token});
    }catch(error){
 console.error("Error in signin:", error);
 res.status(500).json({message:"Internal server error"});
    }
}


export function signinPage(req, res) {
    res.send("signin route");
}

export async function login(req, res) {
   const { email, password } = req.body;
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
    return res.status(400).json({message:"Invalid email or password"}); 

}
const ispasswordCorrect=await user.comparePassword(password);
if(!ispasswordCorrect){
    return res.status(400).json({message:"Invalid email or password"}); 
}



await user.save();
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("jwt", token, cookieOptions)
    res.status(200).json({message:"User logged in successfully", user:user, token});
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
        const requiredFields = {fullName,bio,nativeLanguage,learningLanguage,location};
        const hasMissingField = Object.values(requiredFields).some(
            (value) => typeof value !== "string" || !value.trim()
        );

        if(hasMissingField){
            return res.status(400).json({message:"All fields are required"});
        }

        const updatedFields = Object.fromEntries(
            Object.entries(requiredFields).map(([key, value]) => [key, value.trim()])
        );
        updatedFields.profilepic =
            typeof profilepic === "string" && profilepic.trim()
                ? profilepic.trim()
                : req.user.profilepic || `https://api.dicebear.com/9.x/avataaars/svg?seed=${userID}`;
        updatedFields.isOnboarded = true;

const updateduser=await User.findByIdAndUpdate(userID,updatedFields,{new:true,runValidators:true});
if(!updateduser){    return res.status(404).json({message:"User not found"});
}
void upsertStreamUser({
    id:updateduser._id.toString(),
    name:updateduser.fullName,
    image:updateduser.profilepic||"",
}).then(() => console.log(`stream user updated ${updateduser.fullName}`));

res.status(200).json({message:"User updated successfully",user:updateduser});



}catch(error){
    console.error("Error in updateProfile:", error);
    res.status(500).json({message:"Internal server error"});
}

}

