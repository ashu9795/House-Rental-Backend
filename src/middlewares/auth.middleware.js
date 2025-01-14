import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"; 
import { User } from "../models/user.model.js";

// Middleware to verify JWT and ensure the user is authenticated
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Log headers and cookies for debugging
    // console.log("Headers:", req.headers);
    // console.log("Cookies:", req.cookies);

    // Extract token from cookies or authorization header
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
    // console.log("Token:", token); // Log the extracted token

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Decoded Token:", decodedToken); // Log the decoded token

    // Fetch the user from the database (use `id` if `_id` is not in token payload)
    const user = await User.findById(decodedToken.id || decodedToken._id).select("-password -refreshToken");
    // console.log("User:", user); // Log user for debugging

    if (!user) {
      throw new ApiError(401, "Unauthorized: Invalid user");
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log error for debugging
    throw new ApiError(401, "Unauthorized: Invalid token or user");
  }
});
