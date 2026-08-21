const mongoose = require('mongoose');

mongoose.connect(
"mongodb+srv://dharmitsathvara29_db_user:9JgEfb0Xu8nz1zUU@cluster0.d7fkebh.mongodb.net/?appName=Cluster0"
)

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("MongoDB connected successfully");      
});

db.on("disconnected", ()=>{
    console.log("MongoDB disconnected");    
    
}); 

db.on("error", (err)=>{
    console.log("MongoDB connection error: ", err);
});

module.exports = db;