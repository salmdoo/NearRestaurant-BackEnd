import express, {json} from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import CategoryRouter from "./routers/categoryRouter.js";
import RestaurantRouter from "./routers/restaurantRouter.js";
const app = express();

await mongoose.connect(`mongodb://localhost:27017/NearRestaurant`);
// await mongoose.connect(`mongodb+srv://admin:admin@cluster0.flg58zz.mongodb.net/`);
console.log("DB connected successfully!");

app.use(cors());
app.use(json());
app.use('/categories', CategoryRouter)
app.use('/restaurants', RestaurantRouter)

// error handlers
app.all('*', (req, res, next) => {
    next(new Error('Route not found'));
});

app.use((error, req, res, next) => {
    res.status(500).json({ success: false, data: error.message });
});

app.listen(3000, () => {
    console.log('server is running ...');
});