import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name."],
    },
    email:{
        type:String,
        required:[true,"Please provide a email address."],
        validate:[validator.isEmail,"Please enter a valid email."]
    },
    phone:{
        type:String,
        required:[true,"Please provide your phone number."],
    },
    password:{
        type:String,
        required:[true,"Please provide your password."],
        minLength:[8,"Password must be at least 8 characters!"],
        maxLength:[32,"Password cannot exceed 32 characters!"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please provide your role."],
        enum:["Job Seeker", "Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

});



userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id,}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
};

export const User=mongoose.model("User",userSchema);