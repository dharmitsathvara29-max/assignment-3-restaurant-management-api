const express = require("express");
const Restaurant = require("../models/restaurant");
const Menu = require("../models/menu");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();



router.get("/", async (request, response) => {

    try {

        const restaurants = await Restaurant.find();

        response.status(200).json(restaurants);

    } catch (error) {

        response.status(500).json({
            message: error.message
        });

    }

});

router.get("/top", async (req, res) => {

    try {

        const restaurants = await Restaurant.find()
            .sort({ rating: -1 })
            .limit(5);

        res.status(200).json(restaurants);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/:id", async (request, response) => {

    try {

        const restaurant = await Restaurant.findById(request.params.id);

        if (!restaurant) {
            return response.status(404).json({
                message: "Restaurant not found"
            });
        }

        response.status(200).json(restaurant);

    } catch (error) {

        response.status(500).json({
            message: error.message
        });

    }

});


router.post("/", async (request, response) => {

    try {

        const {
            name,
            city,
            address,
            cuisine,
            rating
        } = request.body;


        if (!name) {
            return response.status(400).json({
                message: "Name is required"
            });
        }

        if (!city) {
            return response.status(400).json({
                message: "City is required"
            });
        }

        if (!address) {
            return response.status(400).json({
                message: "Address is required"
            });
        }


        const existingRestaurant = await Restaurant.findOne({ name });

        if (existingRestaurant) {
            return response.status(400).json({
                message: "Restaurant already exists"
            });
        }


        const newRestaurant = new Restaurant({
            name,
            city,
            address,
            cuisine,
            rating
        });


        await newRestaurant.save();


        response.status(201).json({
            message: "Restaurant added successfully",
            restaurant: newRestaurant
        });


    } catch (error) {

        response.status(500).json({
            message: error.message
        });

    }

});


router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            message: "Restaurant updated successfully",
            restaurant
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const restaurant = await Restaurant.findByIdAndDelete(
            req.params.id
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        await Menu.deleteMany({
            restaurantId: req.params.id
        });

        res.status(200).json({
            message: "Restaurant deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;