const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const upload = require('express-fileupload')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(upload({
    useTempFiles:true
}))
app.use(cors())

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true ,useFindAndModify: false },function(err){
    if(!err){
        console.log("Database connected successfully")
    }
})
mongoose.set("useCreateIndex",true)

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/posts",require("./routes/posts"))
app.use("/api/users",require("./routes/users"))

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(_dirname,"../client","build","index.html"))
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT,function(){
    console.log("Server is running at",PORT)
})