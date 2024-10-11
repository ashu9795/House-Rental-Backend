import mongoose , {Schema} from "mongoose";


const propertySchema = new mongoose.Schema({
 name : {
    type : String,
    required : true,
    trim : true,

 },
 location : {
    type : String,
    required : true,
    trim : true,

    },
 price :
 { type : Number,
    required : true,
    trim : true,


 },

 image : {
    type : String,
    required : true,
    

    },

    details : {
        type : String,
        required : true,
        trim : true,
    
    },

    ownerID : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }



 }, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

export { Property };
