const mongoose = require('mongoose')
Schema = mongoose.Schema

const Post = new Schema({
    name:String,
    emailid:String,
    category:String,
    title:String,
    description:String,
    contact:String,
    imgpath:String,
    date:String,
    time:String,
});

module.exports = mongoose.model("Post",Post);