import mongoose , {Schema} from "mongoose";


const favoriteSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    propertyID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Property"
    }
},{ timestamps: true });


export const Favorites = mongoose.model("Favorites", favoriteSchema);

