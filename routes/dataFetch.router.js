const express=require("express");
const router=express.Router();
const {datamodel}=require("../models/data.model.js")

router.route('/')
 .get(async (req, res) => {
   let { pageNumber,sort,state,city } = req.query;
   console.log(sort,state,city)
    const number = Number(pageNumber);
    const size = 8;
    
   let filter=()=>{
     let filterobj={}
     if(state) filterobj.state={$in:state}
     if(city) filterobj.city={$in:city}
     return filterobj
   } 

   let sorting=()=>{
     
     if(sort==="state_asc") return {state: 1}
     if(sort==="state_desc") return {state: -1}
     if(sort==="city_asc")  return {city: 1}
     if(sort==="city_desc") return {city: -1}
     if(sort==="pop_asc")   return {pop:1}
     if(sort==="pop_desc")   return {pop:-1}
     return {}
   }
    try {
      let data;
      if (number === 1) {
        data = await datamodel.find({...filter()})
          .limit(size)
          .sort({...sorting()})
    
      }

      else {
        const skips = size * (number - 1);
        data = await datamodel.find({...filter()})
          .skip(skips)
          .limit(size)
          .sort({...sorting()})
          
      }

      if (data.length === 0) {
        return res.json([]);
      }
      res.json(data)
    }
    catch(error){
      console.log("error",error)
      res.status(500).json({success:false})
    }
})

router.route('/search/city/')
 .get(async (req, res) => {
   
      let { pageNumber,sort,value } = req.query;
      console.log(sort)
      const number = Number(pageNumber);
      const size = 8;
      const regex =  new RegExp("^"+value.toUpperCase(),'g');
      console.log("log",value);


      let sorting=()=>{
     
      if(sort==="state_asc") return {state: 1}
      if(sort==="state_desc") return {state: -1}
      if(sort==="city_asc")  return {city: 1}
      if(sort==="city_desc") return {city: -1}
      if(sort==="pop_asc")   return {pop:1}
      if(sort==="pop_desc")   return {pop:-1}
      return {}
     }

     try {
      let data;
      if (number === 1) {
        data = await datamodel.find({city:regex})
          .limit(size)
          .sort({...sorting()})
    
      }

      else {
        const skips = size * (number - 1);
        data = await datamodel.find({city:regex})
          .skip(skips)
          .limit(size)
          .sort({...sorting()})
          
      }

      if (data.length === 0) {
        return res.json([]);
      }
      res.json(data)
    }
    catch(error){
      console.log("error",error)
      res.status(500).json({success:false})
    }
  
})

router.route('/search/state/')
 .get(async (req, res) => {
   
      let { pageNumber,sort,value } = req.query;
      console.log(sort)
      const number = Number(pageNumber);
      const size = 8;
      const regex =  new RegExp("^"+value,'g');
      console.log("log",value);


      let sorting=()=>{
     
      if(sort==="state_asc") return {state: 1}
      if(sort==="state_desc") return {state: -1}
      if(sort==="city_asc")  return {city: 1}
      if(sort==="city_desc") return {city: -1}
      if(sort==="pop_asc")   return {pop:1}
      if(sort==="pop_desc")   return {pop:-1}
      return {}
     }

     try {
      let data;
      if (number === 1) {
        data = await datamodel.find({state:regex})
          .limit(size)
          .sort({...sorting()})
    
      }

      else {
        const skips = size * (number - 1);
        data = await datamodel.find({state:regex})
          .skip(skips)
          .limit(size)
          .sort({...sorting()})
          
      }

      if (data.length === 0) {
        return res.json([]);
      }
      res.json(data)
    }
    catch(error){
      console.log("error",error)
      res.status(500).json({success:false})
    }
  
})

module.exports=router;