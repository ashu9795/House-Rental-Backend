import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";

import {Transaction} from "../models/transaction.model.js";

const createTranscation = asyncHandler(async (req, res, next) => {
     const {period, monthlyPayment, totalPayment} = req.body;
    if (!period) {
        throw new ApiError(400, "Period is required");
    }
    if (!monthlyPayment) {
        throw new ApiError(400, "Monthly Payment is required");
    }
    if (!totalPayment) {
        throw new ApiError(400, "Total Payment is required");
    }
    
    const userID = req.user._id;
    if(!userID){
        throw new ApiError(400, "User ID is required");
    }
    const propertyID = req.params.popertyID;
 if(!propertyID){
        throw new ApiError(400, "Property ID is required");
    }
    const transcation = await Transaction.create({
        userID,
        propertyID,
        period,
        monthlyPayment,
        totalPayment,
      
    });

    res.status(201).json(new ApiResponce(201, transcation, "Transcation created"));



})

const getTranscation = asyncHandler(async (req, res, next) => {
    const transcations = await Transaction.find({userID : req.user._id});
            if( transcations.length === 0){
                throw new ApiError(404, "No transcation found");
            }
            res.status(200).json(new ApiResponce(200, transcations, "Transcations found"));
        })



   const updateStatus = asyncHandler(async (req, res, next) => {
    const { transcationID } = req.params;
const userID = req.user._id;

    if (!transcationID) {
        throw new ApiError(400, "Transcation ID is required");
    }

    const transcation = await Transaction.findOne({ _id: transcationID, userID });
   
    if( transcation.paymentStatus === "Cancelled"){
        throw new ApiError(400, "Payment is already cancelled");
    }
    transcation.paymentStatus = "Success";

    await transcation.save();



  res.status(200).json(new ApiResponce(200 , transcation, "Payment Success"));


   })     

   const  cancelTranscation = asyncHandler(async (req, res, next) => {
    const { transcationID } = req.params;
    const userID = req.user._id;
    if (!transcationID) {
        throw new ApiError(400, "Transcation ID is required");
    }
     

    const transcation = await Transaction .findOne({ _id: transcationID, userID });


    if( transcation.paymentStatus === "Success"){
        throw new ApiError(400, "Payment is already done");
    }

    transcation.status = 'Cancelled';
    await transcation.save();

    res.status(200).json(new ApiResponce(200, transcation, "Transcation cancelled"));



})

export { createTranscation, getTranscation, updateStatus, cancelTranscation };