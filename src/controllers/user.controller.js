// src/controllers/user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js"; // Correct the typo
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken(); // These functions are declared in user.model.js
    const refreshToken = user.generateRefreshToken(); // We give access token to user but store refresh token in DB

    // Update refresh token in user and save without validation
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// Define the registerUser function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate input fields
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required"); // Corrected typo
  }
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!phone) {
    throw new ApiError(400, "Phone is required");
  }

  // Check if the user already exists
  const existedUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  // Create new user, including password
  const user = (await User.create({ name, email, phone, password }))

  // Retrieve the created user
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(400, "User not created");
  }

  // Return success response
  return res.status(201).json(new ApiResponce(201, createdUser, "User created successfully")); // Corrected ApiResponse typo
});

const login = asyncHandler(async (req, res) => {
  const {  password, email } = req.body;
 
  if(!email){
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
if (!user) {
  
  throw new ApiError(401, 'Invalid credentials'); // No user found with that email
}


const isPasswordValid = await user.checkPassword(password);

if (!isPasswordValid) {
  console.log('Password mismatch'); // Logging the password mismatch
  throw new ApiError(401, 'Invalid credentials');
}



  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const simplifiedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
  };

  return res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json(new ApiResponce(200, { user: simplifiedUser, accessToken, refreshToken }, "User logged in successfully"));
});






const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken")  // Populating favorite properties
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponce(200, user, "User profile retrieved successfully"));
});


// to update favourite properties
const userUpdate = asyncHandler(async (req, res) => {
  const { name, phone , email } = req.body;

  // Validate input fields
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!phone) {
    throw new ApiError(400, "Phone is required");
  }

  // Update user details
  const user = await User.findByIdAndUpdate(req.user._id, { $set : { name, email, phone} }, { new: true }).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(400, "User not updated");
  }

  return res.status(200).json(new ApiResponce(200, user, "User updated successfully"));
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json(new ApiResponce(200, {}, "User logged out successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) {
    throw new ApiError(400, "Old password is required");
  }
  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.checkPassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(new ApiResponce(200, {}, "Password changed successfully"));
});





export { registerUser ,userProfile ,login , userUpdate , logout , changePassword } ; // Ensure this line is executed
