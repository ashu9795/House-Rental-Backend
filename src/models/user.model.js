import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim : true,
    
    index : true
  },
    email : {
    type : String,
    required : true,
    trim : true,
    unique : true,
    lowercase : true
    },
   
    phone :
    { type : Number,
    required : true,
    trim : true,
    unique : true
    },
         
    	favorites : [{
        type :Schema.Types.ObjectId,
        ref : "Favorites"
        
        
        }],

     // if we want to add password in user schema

    password  : {
    type : String,
    required : [true, "Password is required"],
    trim : true

    },

    refreshToken : {
    type : String,
    }

    




 },{ timestamps: true });

 userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Correct field name: 'this.password'
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (e) {
    return next(e);
  }
});



userSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};




userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this.id,
    email: this.email,
    name: this.name,
     }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:process.env.ACCESS_TOKEN_EXPIRY });
    };
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this.id,
    email: this.email,
    name: this.name,
     }, process.env.REFRESH_TOKEN_SECRET, { expiresIn:process.env.REFRESH_TOKEN_EXPIRY });
    };

export const User = mongoose.model("User", userSchema);