var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

function seedDB(){
    var data = [
        {
            name: "Camp Exotica, Kullu",
            image: "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
            description: "The Camp Exotica is a perfect weekend getaway option located in Kullu in the Manali district of Himachal Pradesh. The accommodation provided is world class and the tents simply leave you connecting with nature like never before. The location of these tents is such that it gives a panoramic view of the surrounding mountains. The food provided is of fine quality and the incredible view will simply leave you in awe of this adventure. Make sure to take out time for this pleasure full camping trip."
        },
        {
            name: "Camp Room on the Roof, Dehradun",
            image: "https://www.holidify.com/images/cmsuploads/compressed/3473170977_c73bf27a6f_z_20190212173011.jpg",
            description: "A more than perfect camp for the adventure enthusiasts, the Camp Room on the Roof is situated 25 km from Chakrata, a quaint town near Dehradun. This camp is located on the step farms giving it a mind-blowing view. From the campsite, you can enjoy the view of the Virratkhai Valley. Setting up base here, you can head off to pursue activities like mountaineering, mountain biking, or rafting in the pristine Yamuna River. The surrounding view will calm the vistas of your mind."
        },
        {
            name: "West Ladakh Camp, Ladakh",
            image: "https://www.holidify.com/images/cmsuploads/compressed/24366507140_38f32204a4_z_20190212174301.jpg",
            description: "If you are planning to go on a trekking trip to Ladakh, you can make it even more adventurous by camping at the West Ladakh Camp. This beautiful campsite is sprawled across 20 acres of ranch and is ideally situated close to the Indus River. The tents are so placed that these are surrounded by apricot and willow trees which nest the migratory birds. You can set your base here and go trekking in the nearby region and visit the Buddhist Monasteries. The food served here is authentic Tibetan and Ladakhi food making it a unique culinary experience."
        }
    ]
    // remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err)
        {
            console.log(err);
        }
            console.log("removed campgrounds");
        
            // add few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed,function(err,campground){
            //         if(err)
            //         {
            //             console.log(err);
            //         }else{
            //             console.log("added campground");
            //                     // add comments
            //                     Comment.create({
            //                         text: "It is the best campground.",
            //                         author: "Roshni Walia"
            //                     },function(err,comment){
            //                         if(err)
            //                         {
            //                             console.log(err);
            //                         }else{
            //                             campground.comments.push(comment);
            //                             campground.save();
            //                             console.log("created comment");
            //                         }
                            
            //                     });

            //                 }
            //             });
                        
                    
                // });
            });
        
        
   

}

module.exports = seedDB;

