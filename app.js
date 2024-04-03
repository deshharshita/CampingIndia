require('dotenv').config()
var express   = require('express') ,
app           = express() ,
bodyParser    = require('body-parser') ,
mongoose      = require('mongoose') ,
passport      = require('passport') ,
LocalStrategy = require('passport-local') ,
methodOverride = require('method-override') ,
Campground    = require('./models/campground') ,
Comment       = require('./models/comment') ,
User          = require('./models/user') ,
flash         = require('connect-flash') ,
seedDB        = require("./seeds");

//requiring ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

// var url = "mongodb://localhost/indiecamp";
var url = "mongodb+srv://harshita22:dbyelpcamp@atlascluster.7vuakdu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
getConnection = async () => {
try {
    await mongoose.connect(url, {useNewUrlParser:true});
} catch(error) {
    handleError(error);
}
};
getConnection();
// mongoose.connect(url, {useNewUrlParser:true});

// mongodb+srv://harshita:<harshita22>@cluster0.7o4at.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// "mongodb+srv://harshita:india@cluster0.7o4at.mongodb.net/indiecamp?retryWrites=true&w=majority"
// mongoose.connect("mongodb://localhost/yelpcamp",{ useNewUrlParser: true ,  useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seeding database
app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "I love Ji Chang Wook",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());    
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.curruser = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success"); 
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT || 3000, function(){
    console.log("CampingIndia Server has started!!");
});