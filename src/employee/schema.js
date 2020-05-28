const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {type: String,unique: true,required: true},
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true}
},{timestamps: true});

module.exports = mongoose.model('userSchema',userSchema);