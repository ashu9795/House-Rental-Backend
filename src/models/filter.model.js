import mongoose , {Schema} from "mongoose";

// it can be neglected


const filterSchema = new mongoose.Schema({
  
    userID : {
        type : Schema.Types.ObjectId,
        ref : "User",
        
    },
    name : {
        type : String,
        
        trim : true,
    },
    location : {
        type : String,
      
        trim : true,
    },
    maxPrice : {
        type : Number,
        default : 0,
    },


},{ timestamps: true });


 export const Filter = mongoose.model("Filter", filterSchema);