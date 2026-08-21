const express = require("express");
const Menu = require("../models/menu");
const Restaurant = require("../models/restaurant");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/:id/menu", async (req, res) => {

    try {

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const menuItems = await Menu.find({
            restaurantId: req.params.id
        });

        res.status(200).json(menuItems);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.post("/:id/menu", authMiddleware, async (req, res) => {

    try {

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const { name, price, isAvailable } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Menu item name is required"
            });
        }

        if (price === undefined) {
            return res.status(400).json({
                message: "Price is required"
            });
        }

        if (isAvailable === undefined) {
            return res.status(400).json({
                message: "Availability is required"
            });
        }

        const menuItem = new Menu({
            restaurantId: req.params.id,
            name,
            price,
            isAvailable
        });

        await menuItem.save();

        res.status(201).json({
            message: "Menu item added successfully",
            menuItem
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});




 router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const menuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            menuItem
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


 router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const menuItem = await Menu.findByIdAndDelete(
            req.params.id
        );

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;