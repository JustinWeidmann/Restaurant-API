const Restaurant = require('../schemas/RestaurantSchem.ts');
const geocoder = require('../config/geoCode.ts');


exports.getRestaurants = async (req, res) => {
    try{
        const restaurants = await Restaurant.find();

        return res.status(200).json({
            status: true,
            count: restaurants.length,
            data: restaurants
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.getRestaurantID = async (req, res) => {
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        if(restaurant){
            res.status(200).json({
                status: true,
                restaurant: restaurant
            });
        }
        else if(restaurant == null){
            res.status(400).json({
                status: false,
                error: 'ID not found'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.getRestaurantsCompany = async (req, res) => {
    try{
        const restaurants = await Restaurant.find({ companyID: req.params.comid });
        if(restaurants){
            res.status(200).json({
                status: true,
                restaurants: restaurants
            });
        }
        else if(restaurants == null){
            res.status(400).json({
                status: false,
                error: 'Company ID does not exist or does not have any restaurants'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.getRestaurantsCord = async (req, res) => {
    try{
        const restaurants = await Restaurant.find({
            location:{
                $nearSphere:{
                    $geometry:{
                        type: "Point",
                        coordinates: [req.query.lon, req.query.lat]
                    },
                    $maxDistance: req.query.range * 1609.34 // 1609.34 = Meters per mile
                }
            }
        });

        if(restaurants.length > 0){
            res.status(200).json({
                status: true,
                restaurants: restaurants
            });
        }
        else if(restaurants.length == 0){
            res.status(400).json({
                status: false,
                error: "No restaurants in range"
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error, This is uniqe! 😉'});
    }
}

exports.addRestaurant = async (req, res) => {
    try{
        // Geocode
        const loc = await geocoder.geocode(req.body.address);
        req.body.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude]
        };

        // isoString to iso
        const hours = req.body.hours;
        if(typeof hours.mon[0] == 'string'){
            // For some reason a date is required. This should be re-jimmyed to only be an iso timestamp if such a thing exists
            const baseDate = "January 1, 1970 ";

            req.body.hours = {
                mon: [new Date(baseDate+hours.mon[0]), new Date(baseDate+hours.mon[1])],
                tue: [new Date(baseDate+hours.tue[0]), new Date(baseDate+hours.tue[1])],
                wed: [new Date(baseDate+hours.wed[0]), new Date(baseDate+hours.wed[1])],
                thu: [new Date(baseDate+hours.thu[0]), new Date(baseDate+hours.thu[1])],
                fri: [new Date(baseDate+hours.fri[0]), new Date(baseDate+hours.fri[1])],
                sat: [new Date(baseDate+hours.sat[0]), new Date(baseDate+hours.sat[1])],
                sun: [new Date(baseDate+hours.sun[0]), new Date(baseDate+hours.sun[1])]
            };
        }

        // console.log(req.body);
        const restaurant = await Restaurant.create(req.body);
        res.status(200).json({
            status: true,
            answer: 'Your a winner',
            data: restaurant
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.addRestaurantCord = async (req, res) => {
    try{
        // console.log(req.body);
        const restaurant = await Restaurant.create(req.body);
        res.status(200).json({
            status: true,
            answer: 'Your a winner',
            data: restaurant
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.updateRestaurant = async (req, res) => {
    if(!req.body){
        res.status(400).json({
            status: false,
            error: "Enter data to be updated"
        });
    }

    // Geocode
    const loc = await geocoder.geocode(req.body.address);
    req.body.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
    };

    // isoString to iso
    const hours = req.body.hours;
    if(typeof hours.mon[0] == 'string'){
        // For some reason a date is required. This should be re-jimmyed to only be an iso timestamp if such a thing exists
        const baseDate = "January 1, 1970 ";

        req.body.hours = {
            mon: [new Date(baseDate+hours.mon[0]), new Date(baseDate+hours.mon[1])],
            tue: [new Date(baseDate+hours.tue[0]), new Date(baseDate+hours.tue[1])],
            wed: [new Date(baseDate+hours.wed[0]), new Date(baseDate+hours.wed[1])],
            thu: [new Date(baseDate+hours.thu[0]), new Date(baseDate+hours.thu[1])],
            fri: [new Date(baseDate+hours.fri[0]), new Date(baseDate+hours.fri[1])],
            sat: [new Date(baseDate+hours.sat[0]), new Date(baseDate+hours.sat[1])],
            sun: [new Date(baseDate+hours.sun[0]), new Date(baseDate+hours.sun[1])]
        };
    }

    try{
        const restId = req.params.id;
        const restaurant = await Restaurant.findByIdAndUpdate(restId, req.body);
        if(restaurant == null){
            res.status(400).json({
                status: false,
                error: `Restaurant ID of ${restId} does not exist`
            });
        }
        else{
            res.status(200).json({
                status: true,
                goodNews: `Updated restaurant with id of: ${restId}` 
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, error: 'Server Error'});
    }
}

exports.deleteRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findByIdAndRemove(req.params.id);
        if(restaurant == null){
            res.status(400).json({
                status: false,
                error: "Restaurant ID of ${restId} does not exist"
            });
        }
        else{
            res.status(200).json({
                status: true,
                answer: "Successfully Deleted",
                restaurant: restaurant
            });
        }
    }
    catch(err){
        console.log(err);
    }
}
