const router = require('express').Router();
const restaurants = require('../controllers/restaurantController.ts');


router
    .route('/restaurants')    // Get all restaurants
    .get(restaurants.getRestaurants)
    .post(restaurants.addRestaurant);   

router
    .route('/restaurants/cords')  // Add restaurant with cords
    .get(restaurants.getRestaurantsCord)
    .post(restaurants.addRestaurantCord);

router
    .route('/restaurants/:id')
    .get(restaurants.getRestaurantID)
    .put(restaurants.updateRestaurant)
    .delete(restaurants.deleteRestaurant);  // Get, Update & Delete Restaurant by _id

router.route('/restaurants/company_id/:comid').get(restaurants.getRestaurantsCompany);


module.exports = router;