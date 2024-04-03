var express    = require("express");
var router     = express.Router();
var User       = require("../models/user");
var passport   = require("passport");


// root route
router.get('/',function(req,res){
    res.render("landing");
});

// =========================================================================
// AUTH ROUTES
// =========================================================================

// show register form
router.get('/register',function(req,res){
    res.render("register",{page: "register"});
});
// handling register logic
router.post('/register',function(req,res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    if(req.body.adminCode === "secret1234")
    {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err,user){
        if(err)
        {
            // console.log(err);
            req.flash("error",err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to CampingIndia " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
// show login form
router.get('/login',function(req,res){
    res.render("login",{page: "login"});
});
// handle login logic
router.post('/login', passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});
// logout route
router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
});




module.exports = router;