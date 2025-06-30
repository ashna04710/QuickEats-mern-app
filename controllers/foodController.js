import fs from 'fs';
import Foodmodel from "../models/foodmodel.js";

// Add new food
export const addFood = async (req, res) => {
  try {
   const { name, description, price, category } = req.body;

    const image = req.file ? req.file.filename : null;

   if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFood = new Foodmodel({
      name,
      price,
      category,
      description,
      image,
    });

    await newFood.save();

    res.status(201).json({ success: true, message: 'Food item added successfully' });

  } catch (error) {
    console.error('🔥 Error adding food:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await Foodmodel.find();
    res.status(200).json({ data: foods }); // Consistent with frontend expectation
  } catch (error) {
    console.error("🔥 Error listing food:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Edit food item
export const editFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const food = await Foodmodel.findById(id);
    if (!food) return res.status(404).json({ error: "Food item not found" });

    if (image && food.image) {
      // Delete old image
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error("Error deleting old image:", err.message);
      });
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    if (image) food.image = image;

    await food.save();

    res.status(200).json({ success: true, message: "Food item updated successfully" });
  } catch (error) {
    console.error("🔥 Error editing food:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await Foodmodel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    // Delete the image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error('Error deleting image:', err.message);
      }
    });

    // Delete the food item
    await Foodmodel.findByIdAndDelete(req.body.id);

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('🔥 Error removing food:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
