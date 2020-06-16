const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('../models/user');

router.get("/verify",function(req,res){
  if(req.isAuthenticated()){
    res.json({msg:"Correct",name:req.user.fullname,email:req.user.username})
}
else{
    res.json({msg:"Not Authorized"})
}
})

router.post('/signup', function(req, res) {
  if(req.body.fname===''){
    res.json({msg:"Please Fill The First Name Field",element:"fname"})
  }
  else if(req.body.lname===''){
    res.json({msg:"Please Fill The Last Name Field",element:"lname"})
  }
  else if(req.body.username===''){
    res.json({msg:"Please Fill The Email Address Field",element:"username"})
  }
  else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.username))){
    res.json({msg:"Please Enter The Valid Email Address",element:"username"})
  }
  else if(req.body.password===''){
    res.json({msg:"Please Fill The Password Field",element:"password"})
  }
  else if(req.body.password.length<8){
    res.json({msg:"Password Should Be Minimum 8 Characters",element:"password"})
  }
  else if(req.body.confirmpassword===''){
    res.json({msg:"Please Fill The Confirm Password Field",element:"confirmpassword"})
  }
  else if(req.body.password!==req.body.confirmpassword){
    res.json({msg:"Password And Confirm Password Fields Does Not Match",element:"confirmpassword"})
  }
  else{
  User.findOne({username:req.body.username},function(err,user){
    if(err){
        console.log(err)
        res.json({msg:"Some Error Occurred. Please Try Again"})
    }
    else{
        if(user){
            res.json({msg:"This Email Address Is Already Registered",element:"username"})
        }
        else{
            const fullname=req.body.fname+' '+req.body.lname
            User.register(new User({username: req.body.username,fullname:fullname}), req.body.password, function(err,user) {
              if(err){
                console.log(err)
                res.json({msg:"Some Error Occurred. Please Try Again"})
              }
              else{
                passport.authenticate("local")(req, res, function(){
                  res.json({msg:"Correct",name:fullname,email:user.username})
              })
              }
            })
        }
    }
  })}
})

router.post('/login',passport.authenticate("local", 
  {
    successRedirect: "/api/users/success",
    failureRedirect: "/api/users/failure"
  }), function(req, res) {
})



router.get("/success",function(req,res){
    res.json({msg:"Correct",name:req.user.fullname,email:req.user.username})
})

router.get("/failure",function(req,res){
    res.json({msg:"Invalid Credentials"})
})

router.get("/logout", function(req, res){
  req.logout();
  res.json({msg:"Correct"})
});

module.exports = router;