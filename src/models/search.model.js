import mongoose , {Schema} from "mongoose";


const searchSchema = new mongoose.Schema({

  name : {
    type : String,
    required : false,
    trim : true,

 },
 location : {
    type : String,
    required : false,
    trim : true,

    },
    results: [{ 
        type: Schema.Types.ObjectId,
        ref: "Property",
        required: true,
      }],
  userID : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  }



},{ timestamps: true });


 export const Search = mongoose.model("Search", searchSchema);