const mongoose = require('mongoose');
const url = process.env.URL;


mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false},(e)=>{
    if(e){
        res.json({code: 0,message: `Error in connecting to database - ${e}`});
    }else{
        console.log('Connected to database');
       
    }
});