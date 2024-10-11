import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { Property } from "../models/property.model.js";
import { Search } from "../models/search.model.js";

const searchProperty = asyncHandler(async (req, res) => {

    const { name, location } = req.body;

    if( ! (name || location)){
        throw new ApiError(400, "Name or location is required");
    }
    let query = {};

    if(name){
        query.name = { $regex: name, $options: "i" };
    }
     
    if(location){
        query.location = { $regex: location, $options: "i" }; 
    }
     
    const properties = await Property.find(query);
    if(properties.length === 0){
        throw new ApiError(404, "No property found");
    }
    res.status(200).json(new ApiResponce(200, properties, "Properties found"));

    




});

const savedSearch = asyncHandler(async (req, res) => {
    const { name, location } = req.body;
    const userID = req.user._id;

    if (!(name || location)) {
        throw new ApiError(400, "Name or location is required");
    }

    let query = {};

    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    const properties = await Property.find(query);
    if (properties.length === 0) {
        throw new ApiError(404, "No property found");
    }

    // Check if a search with the same name, location, and userID already exists
    const existingSearch = await Search.findOne({ $and : [{userID},{$or: [{ name, location }]}] });

    if (existingSearch) {
        // If the search exists, update the existing search with the new property IDs
        existingSearch.results = [...new Set([...existingSearch.results, ...properties.map(property => property._id)])];
        await existingSearch.save();
        res.status(200).json(new ApiResponce(200, { properties, search: existingSearch }, "Properties found and search updated"));
    } else {
       
        const search = new Search({
            name,
            location,
            results: properties.map(property => property._id),
            userID: userID
        });

        await search.save();
        res.status(200).json(new ApiResponce(200, { properties, search }, "Properties found and search saved"));
    }

})

const searchResult = asyncHandler(async (req, res) => {

  
 const userID = req.user._id;

    const search = await Search.find({userID}).populate("results");
    if(search.length === 0){
        throw new ApiError(404, "No search found");
    }
    res.status(200).json(new ApiResponce(200, search, "Search found"));

    
})




export { searchProperty , savedSearch ,  searchResult };