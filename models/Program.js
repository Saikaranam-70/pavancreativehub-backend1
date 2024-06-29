const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }]
})
const Program = mongoose.model('Program', programSchema);
module.exports = Program