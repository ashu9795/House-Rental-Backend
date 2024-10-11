import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js"; // Correct the typo
import { User } from "../models/user.model.js";
import { Property } from "../models/property.model.js";


const addFavorite = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;
  
    if (!propertyId) {
      throw new ApiError(400, "Property ID is required");
    }
  
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
   
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites : propertyId } }, // Only adds if it's not already in the array
      { new: true }
    ).select("-password -refreshToken"); 
  return res.status(200).json(new ApiResponce(200, {}, "Property added to favorites successfully"));
  });
  
  const removeFavorite = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;
  
    if (!propertyId) {
      throw new ApiError(400, "Property ID is required");
    }
  
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites : propertyId } }, // Removes the property from the array
      { new: true }
    ).select("-password -refreshToken");
    return res.status(200).json(new ApiResponce(200, {}, "Property removed from favorites successfully"));
  
  });

  const getFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("favorites");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponce(200, user.favorites, "Favorite properties retrieved successfully"));
    });



  export { addFavorite, removeFavorite , getFavorites};