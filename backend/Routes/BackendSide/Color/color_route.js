const express = require('express')
const route = express.Router()
const Color = require('../../../Models/BackendSide/color_model')
const fs = require('fs');


// Create Color
route.post('/add', async (req, res) => {
    try {
        const { name } = req.body;

        const colorNameLower = name.toLowerCase();
        const existingColor = await Color.findOne({ name: { $regex: new RegExp(colorNameLower, 'i') } });

        if (existingColor) {
            return res.status(202).json({ type: 'warning', message: 'Color already exists!' });
        }

        const color = new Color({
            name: name,
        });

        await color.save();
        res.status(200).json({ type: "success", message: "Color added successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// get all Color 
route.get('/get', async (req, res) => {
    try {
        const colors = await Color.find().sort({ createdAt: -1 });
        let result = []

        if (colors?.length > 0) {
            result = colors?.map(color => {
                return {
                    ...color.toObject(),
                }
            })
        }

        res.status(200).json({ type: "success", message: " Colors found successfully!", color: result || [] })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
        console.log(error)
    }
});

// find Color by id
route.get('/get/:id', async (req, res) => {
    const { id } = req.params
    try {
        const color = await Color.findOne({ _id: id });
        res.status(201).json({ type: "success", message: "Color found successfully!", color: color })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }
});

// Delete all Color
route.delete('/delete', async (req, res) => {
    try {
        await Color.deleteMany();
        res.status(200).json({ type: "success", message: "All Colors deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete many Color
route.delete('/deletes', async (req, res) => {
    try {
        const { ids } = req.body;
        const color = await Color.find({ _id: { $in: ids } });
        await Color.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ type: "success", message: "All Colors deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete color by ID
route.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Color.findByIdAndDelete(id);
        res.status(200).json({ type: "success", message: "Color deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// update only status 
route.put("/update/status/:id", async (req, res) => {

    const id = await req.params.id

    try {
        const { status } = req.body
        const color = await Color.findByIdAndUpdate(id)
        color.status = await status

        await color.save()
        res.status(200).json({ type: "success", message: "Color Status update successfully!" })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }

})

// Update Color
route.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const existingColor = await Color.findOne({ name: name, _id: { $ne: id } });

        if (existingColor) {
            return res.status(202).json({ type: 'warning', message: 'Color already exists!' });
        }

        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ type: "warning", message: "Color does not exist!" });
        }

        color.name = name

        await color.save();
        res.status(200).json({ type: "success", message: "Color updated successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
        console.log(error)
    }
});


module.exports = route
