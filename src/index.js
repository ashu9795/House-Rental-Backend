import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js"
dotenv.config({
    path :'./.env'
})

connectDB()
.then(()=>
{  
    app.on('error', (error) => {
        console.log("Error in express", error);
        
    });

    app.listen(process.env.PORT ||8000 , () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed ", error);
    process.exit(1);
});