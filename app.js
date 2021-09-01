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

mongoose.connect("mongodb+srv://harshita:india@cluster0.7o4at.mongodb.net/indiecamp?retryWrites=true&w=majority",{ useNewUrlParser: true ,  useUnifiedTopology: true, useFindAndModify: false});

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
    console.log("Yelp Camp Server has started!!");
});