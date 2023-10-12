import Category from "../models/category.js";

const RestaurantService = {
    addRestaurant: async function(categoryId, restaurant){
        return await Category.updateOne({_id: categoryId}, {$push: {restaurants: restaurant}});
    },
    setFavouriteRestaurant: async function (categoryId, restaurantId, isFavouriteValue) {
        let isFavourite = isFavouriteValue ? isFavouriteValue : false
        return await Category.updateOne(
            { _id: categoryId, 'restaurants._id': restaurantId },
            { $set: { 'restaurants.$.isFavourite': isFavourite } },
        );
    },
    getRestaurantByCategoryId: async function (categoryId) {
        return await Category.find(
            { _id: categoryId }
        );
    },
    getRestaurantById: async function (categoryId, restaurantId) {
        let result = await Category.find({'_id': categoryId, "restaurants": {$elemMatch: {"_id": restaurantId}}})
        return result
    },
}
export default RestaurantService;