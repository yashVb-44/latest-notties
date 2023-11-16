const express = require('express')
const route = express.Router()
const Size = require('../../../Models/BackendSide/size_model')
const fs = require('fs');


// Create Size
route.post('/add', async (req, res) => {
    try {
        const { name } = req.body;

        const existingSize = await Size.findOne({ name: name });

        if (existingSize) {
            return res.status(202).json({ type: 'warning', message: 'Size already exists!' });
        }

        const size = new Size({
            name: name,
        });

        await size.save();
        res.status(200).json({ type: "success", message: "Size added successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// get all Size 
route.get('/get', async (req, res) => {
    try {
        const sizes = await Size.find().sort({ createdAt: -1 });
        let result = []

        if (sizes?.length > 0) {
            result = sizes?.map(size => {
                return {
                    ...size.toObject(),
                }
            })
        }

        res.status(200).json({ type: "success", message: " Sizes found successfully!", size: result || [] })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
        console.log(error)
    }
});

// find Size by id
route.get('/get/:id', async (req, res) => {
    const { id } = req.params
    try {
        const size = await Size.findOne({ _id: id });
        res.status(201).json({ type: "success", message: "Size found successfully!", size: size })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }
});

// Delete all Size
route.delete('/delete', async (req, res) => {
    try {
        await Size.deleteMany();
        res.status(200).json({ type: "success", message: "All Sizes deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete many Size
route.delete('/deletes', async (req, res) => {
    try {
        const { ids } = req.body;
        const size = await Size.find({ _id: { $in: ids } });
        await Size.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ type: "success", message: "All Sizes deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete size by ID
route.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Size.findByIdAndDelete(id);
        res.status(200).json({ type: "success", message: "Size deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// update only status 
route.put("/update/status/:id", async (req, res) => {

    const id = await req.params.id

    try {
        const { status } = req.body
        const size = await Size.findByIdAndUpdate(id)
        size.status = await status

        await size.save()
        res.status(200).json({ type: "success", message: "Size Status update successfully!" })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }

})

// Update Size
route.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const existingSize = await Size.findOne({ name: name, _id: { $ne: id } });

        if (existingSize) {
            return res.status(202).json({ type: 'warning', message: 'Size already exists!' });
        }

        const size = await Size.findById(id);
        if (!size) {
            return res.status(404).json({ type: "warning", message: "Size does not exist!" });
        }

        size.name = name

        await size.save();
        res.status(200).json({ type: "success", message: "Size updated successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
        console.log(error)
    }
});


module.exports = route
