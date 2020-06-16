const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Post = require('../models/post');

router.get("/getposts",function(req,res){
    Post.find(function(err,posts){
        if(err){
            console.log(err)
            res.json({msg:"Some Error Occurred. Please Try Again"})
        }
        else{
            res.json(posts.reverse())
        }
    })
})
router.get("/getpost/:id",function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err)
            res.json({msg:"Some Error Occurred. Please Try Again"})
        }
        else{
            res.json(post)
        }
    })
})


router.post("/createpost",function(req,res){
    if(req.body.category===''){
        res.json({msg:"Please Fill The Category Field",element:"category"})
    }
    else if(req.body.title===''){
        res.json({msg:"Please Fill The Title Field",element:"title"})
    }
    else if(req.body.description===''){
        res.json({msg:"Please Fill The Description Field",element:"description"})
    }
    else if(req.body.contact===''){
        res.json({msg:"Please Fill The Contact/Donation Details Field",element:"contact"})
    }
    else if(req.files==null){
        res.json({msg:"Please Upload An Image",element:"image"})
    }
    else{
        const file=req.files.file
        if(file.mimetype!='image/jpeg' && file.mimetype!='image/jpg' && file.mimetype!='image/png'){
            res.json({msg:"Please Upload Only jpeg/png Formatted Image"})
        }
        else{
            const filename=Date.now()+'_'+file.name
            const imgpath='./client/build/uploads/'+filename
            file.mv(imgpath,function(err){
                if(err){
                    console.log(err)
                    res.json({msg:"Some Error Occurred. Please Try Again"})
                }
                else{
                    const date=new Date()
                    const newpost=new Post({
                        name:req.body.name,
                        emailid:req.body.emailid,
                        category:req.body.category,
                        title:req.body.title,
                        description:req.body.description,
                        contact:req.body.contact,
                        imgpath:filename,
                        date:(('0'+date.getDate()).slice(-2))+'/'+(('0'+(date.getMonth()+1)).slice(-2))+'/'+date.getFullYear(),
                        time:(('0'+date.getHours()).slice(-2))+':'+(('0'+date.getMinutes()).slice(-2))+':'+(('0'+date.getSeconds()).slice(-2)),
                    })
                    newpost.save(function(err){
                        if(err){
                            console.log(err)
                            res.json({msg:"Some Error Occurred. Please Try Again"})
                        }
                        else{
                            res.json({msg:"Correct"})
                        }
                    })
                }
            }) 
        }
         
    }    
})

router.put("/updatepost/:id",function(req,res){
    if(req.body.title===''){
        res.json({msg:"Please Fill The Title Field",element:"title"})
    }
    else if(req.body.description===''){
        res.json({msg:"Please Fill The Description Field",element:"description"})
    }
    else if(req.body.contact===''){
        res.json({msg:"Please Fill The Contact/Donation Details Field",element:"contact"})
    }
    else if(req.files!=null){
        const file=req.files.file
        if(file.mimetype!='image/jpeg' && file.mimetype!='image/jpg' && file.mimetype!='image/png'){
            res.json({msg:"Only jpeg/png Image Formarts Are Supported",element:"image"})
        }
        else{
            const filename=Date.now()+'_'+file.name
            const imgpath='./client/build/uploads/'+filename
            file.mv(imgpath,function(err){
                if(err){
                    console.log(err)
                    res.json({msg:"Some Error Occurred. Please Try Again"})
                }
                else{
                    Post.findByIdAndUpdate(req.params.id,
                        {
                            name:req.body.name,
                            emailid:req.body.emailid,
                            category:req.body.category,
                            title:req.body.title,
                            description:req.body.description,
                            contact:req.body.contact,
                            imgpath:filename,
                        },function(err){
                            if(err){
                                console.log(err)
                                res.json({msg:"Some Error Occurred. Please Try Again"})
                            }
                            else{
                                res.json({msg:"Correct"})
                            }
                        })
                    
                }
            })
        }
    }
    else{
        Post.findByIdAndUpdate(req.params.id,
            {
                name:req.body.name,
                emailid:req.body.emailid,
                category:req.body.category,
                title:req.body.title,
                description:req.body.description,
                contact:req.body.contact,
            },function(err){
                if(err){
                    console.log(err)
                    res.json({msg:"Some Error Occurred. Please Try Again"})
                }
                else{
                    res.json({msg:"Correct"})
                }
            })
    }
})
    
      

router.delete("/deletepost/:id",function(req,res){
    Post.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
            res.json({msg:"Some Error Occurred. Please Try Again"})
        }
        else{
            res.json({msg:"Correct"})
        }
    })
})

module.exports = router;