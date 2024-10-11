import mongoose , {Schema} from "mongoose";
 // it is not required


const filterPopupSchema = new mongoose.Schema({
  userID : {
    type : Schema.Types.ObjectId,
    ref : "User",
    
  },

  appliedFilters: [
    {
      filterName: {
        type: String,
        required: true,
      },
      filterValue: {
        type: String,
        required: true,
      },
    },
  ],


},{ timestamps: true });


const FilterPopup = mongoose.model("FilterPopup", filterPopupSchema);

