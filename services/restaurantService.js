import Category from "../models/category.js";
import {ObjectId} from "mongodb";

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
        return await Category.aggregate([
            {$match: { _id: new ObjectId(categoryId)} },
            {$unwind: "$restaurants"}
            ]
        );
    },
    getRestaurantById: async function (categoryId, restaurantId) {
        let result = await Category.findOne({ "_id": categoryId, "restaurants._id": restaurantId },
            { "restaurants.$": 1 })
        return result
    },
}
export default RestaurantService;