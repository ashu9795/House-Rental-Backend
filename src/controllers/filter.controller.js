import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { Property } from "../models/property.model.js";


const applyFilter = asyncHandler(async (req, res, next) => {

  



    const { name, location , maxPrice } = req.query;

    if( ! (name || location|| maxPrice)){
        throw new ApiError(400, "Name or location or price is required");
    }
    let query = {};

    if(name){
        query.name = { $regex: name, $options: "i" };
    }
     
    if(location){
        query.location = { $regex: location, $options: "i" }; 
    }

    if(maxPrice){
        query.price = { $lte: maxPrice };
    }
     
    const properties = await Property.find(query);
    if(properties.length === 0){
        throw new ApiError(404, "No property found");
    }
    res.status(200).json(new ApiResponce(200, properties, "Properties found"));

    








}
);



export { applyFilter };