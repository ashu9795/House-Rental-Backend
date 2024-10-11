import mongoose , {Schema} from "mongoose";

const transactionSchema = new mongoose.Schema({
  userID : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true

  },
    propertyID : {
        type : Schema.Types.ObjectId,
        ref : "Property",
        required : true
    },
    period : {
        type : Number,
        required : true,
        
    },
    monthlyPayment : {
        type : Number,
        required : true,
        
    },
    totalPayment : {
        type : Number,
        required : true,
        
    },
    paymentStatus : {
        type : String,
        required : true,
        enum : ["Pending", "Success","Cancelled"],
        default : "Pending"
        
    }

},{ timestamps: true });



 export const Transaction = mongoose.model("Transaction", transactionSchema);