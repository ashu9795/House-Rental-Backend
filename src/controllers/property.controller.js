import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { Property } from "../models/property.model.js";
import uploadCloudinary from "../utils/cloudinary.js";




    const addProperty = asyncHandler(async (req, res) => {
        const { name, location, price, details } = req.body;
      
        
        if (!name) {
            throw new ApiError(400, "Name is required");
        }
        if (!location) {
            throw new ApiError(400, "Location is required");
        }
        if (!price) {
            throw new ApiError(400, "Price is required");
        }
        if (!details) {
            throw new ApiError(400, "Details are required");
        }
    
        // Ensure file exists and correctly handle it
        if (!req.file) {
            throw new ApiError(400, "Image is required");
        }
    
        const imagePath = req.file.path;
        // Log the image path
    
        if (!imagePath) {
            throw new ApiError(400, "Image path is required");
        }
     const existedProperty = await Property.findOne({
        $and: [{ name }, { location }]
     });
        if (existedProperty) {
            throw new ApiError(400, "Property already exists");
        }


        const image = await uploadCloudinary(imagePath);


        if(!image){
            throw new ApiError(400, "Error uploading image");
        }

    
            const property = await Property.create({
                name,
                location,
                price,
                details,
                ownerID: req.user._id,
                image: image.url,
            });
    
            res.status(201).json(new ApiResponce(201, property, "Property created successfully"));
    
        
    });

    const updateProperty = asyncHandler(async (req, res) => {
      
    
        const { name, location, price, details } = req.body;
    
        if (!name) {
            throw new ApiError(400, "Name is required");
        }
        if (!location) {
            throw new ApiError(400, "Location is required");
        }
        if (!price) {
            throw new ApiError(400, "Price is required");
        }
        if (!details) {
            throw new ApiError(400, "Details are required");
        }
    
        const { propID } = req.params;
        if (!propID) {
            throw new ApiError(400, "Property ID is required");
        }
    
        const property = await Property.findByIdAndUpdate(propID, {
            $set: {
                name,
                location,
                price,
                details
            }
        }, {
            new: true
        });
    
        if (!property) {
            throw new ApiError(400, "Property not updated");
        }
    
        res.status(200).json(new ApiResponce(200, property, "Property updated successfully"));
    });
    

    const updatePropertyPicture = asyncHandler(async (req, res) => {
        const { propID } = req.params;
        if (!propID) {
            throw new ApiError(400, "Property ID is required");
        }
         if(!req.file){
            throw new ApiError(400, "Image is required");
        }
        const imagePath = req.file.path;

        if (!imagePath) {
            throw new ApiError(400, "Image path is required");
        }

        const image = await uploadCloudinary(imagePath);

        if(!image){
            throw new ApiError(400, "Error uploading image");
        }

        const property  = await Property.findByIdAndUpdate(propID, {
            $set: {
                image : image.url
            }
        }, {
            new: true
        }); 


        if (!property) {
            throw new ApiError(400, "Property not updated");
        }

        res.status(200).json(new ApiResponce(200, property, "Property updated successfully"));
    


    })

    const getPropertyBYId = asyncHandler(async (req, res) => {
        const {propID} = req.params;
        if (!propID) {
            throw new ApiError(400, "Property ID is required");
        }

        const property = await Property.findById(propID);

        if (!property) {
            throw new ApiError(400, "Property not found");
        }

        res.status(200).json(new ApiResponce(200, property, "Property retrieved successfully"));

    })

    const getProperty = asyncHandler(async (req, res) => {
        const properties = await Property.find();
        if (!properties) {
            throw new ApiError(404, "Properties not found");
        }
        res.status(200).json(new ApiResponce(200, properties, "Properties retrieved successfully"));
    });

    const deleteProperty = asyncHandler(async (req, res) => {
        const { propID } = req.params;
        if (!propID) {
            throw new ApiError(400, "Property ID is required");
        }
        const property = await Property.findByIdAndDelete(propID);
        if (!property) {
            throw new ApiError(400, "Property not deleted");
        }
        res.status(200).json(new ApiResponce(200, {}, "Property deleted successfully"));



    });

    

export { addProperty , updateProperty , updatePropertyPicture,getPropertyBYId ,getProperty,deleteProperty};
