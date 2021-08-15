const mongoose=require('mongoose');

const dataSchema=new mongoose.Schema({
 _id:String,
 city:String,
 loc:[],
 pop:Number,
 state:String

})

//model creation
const datamodel=mongoose.model('data',dataSchema);

module.exports={datamodel}