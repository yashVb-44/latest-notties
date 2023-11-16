const express = require('express')
const route = express.Router()
const Offers = require('../../../Models/BackendSide/offers_model')
const { Product, Variation } = require('../../../Models/BackendSide/product_model')
const User = require('../../../Models/FrontendSide/user_model')
const Wishlist = require('../../../Models/FrontendSide/wish_list_model');
const Review = require('../../../Models/FrontendSide/review_model')
const multer = require('multer')
const fs = require('fs');


// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imageUploads/backend/offers')
    },
    filename: function (req, file, cb) {
        cb(null, file?.originalname)
    }
})
const upload = multer({ storage: storage })


// Create Offers
route.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;

        const offers = new Offers({
            name: name,
        });

        if (req?.file) {
            const originalFilename = req.file.originalname;
            const extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            const imageFilename = `${req.body.name.replace(/[#$%]/g, '').replace(/\s/g, '_')}${extension}`;
            const imagePath = 'imageUploads/backend/offers/' + imageFilename;

            fs.renameSync(req?.file?.path, imagePath);

            const image = imagePath
            offers.image = image;
        }

        await offers.save();
        res.status(200).json({ type: "success", message: "Offers added successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// get all Offers 
route.get('/get', async (req, res) => {
    try {
        const offers = await Offers.find().sort({ createdAt: -1 });
        let result = []

        if (offers?.length > 0) {
            result = offers?.map(offer => {
                return {
                    ...offer.toObject(),
                    image: `${process.env.IMAGE_URL}/${offer?.image?.replace(/\\/g, '/')}`,
                    // Date: new Date(video?.createdAt)?.toLocaleDateString('en-IN'),
                }
            })
        }

        const enableoffers = await Offers.find({ status: true }).sort({ createdAt: -1 });

        res.status(200).json({ type: "success", message: " Offers found successfully!", offers: result || [], enableoffers: enableoffers || [] })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
        console.log(error)
    }
});

// find Offers by id
route.get('/get/:id', async (req, res) => {
    const { id } = req.params
    try {
        const offers = await PostVideo.findOne({ _id: id });

        if (offers) {
            result = {
                ...offer.toObject(),
                image: `${process.env.IMAGE_URL}/${offer?.offers?.replace(/\\/g, '/')}`,
                // Date: new Date(video?.createdAt)?.toLocaleDateString('en-IN'),
            }
        }

        res.status(201).json({ type: "success", message: "Offers found successfully!", offers: offers })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }
});

// find Offers by id
route.get('/mob/get', async (req, res) => {
    try {
        const offers = await Offers.find({ status: true });
        res.status(201).json({ type: "success", message: "Offers found successfully!", offers: offers || [] })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }
});

// Delete all Offers
route.delete('/delete', async (req, res) => {
    try {
        await Offers.deleteMany();
        res.status(200).json({ type: "success", message: "All Offers deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete many Offers
route.delete('/deletes', async (req, res) => {
    try {
        const { ids } = req.body;
        const offers = await Offers.find({ _id: { $in: ids } });
        await Offers.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ type: "success", message: "All Offers deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// Delete data by ID
route.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Offers.findByIdAndDelete(id);
        res.status(200).json({ type: "success", message: "Offers deleted successfully!" });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
    }
});

// update only status 
route.put("/update/status/:id", async (req, res) => {

    const id = await req.params.id

    try {
        const { status } = req.body
        const offers = await Offers.findByIdAndUpdate(id)
        offers.status = await status

        await offers.save()
        res.status(200).json({ type: "success", message: "Offers Status update successfully!" })

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error })
    }

})

// Update data
route.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const offers = await Offers.findById(id);
        if (!offers) {
            return res.status(404).json({ type: "warning", message: "Offers does not exist!" });
        }

        offers.name = name

        if (req.file) {

            if (offers.image && fs.existsSync(offers.image.path)) {
                try {
                    fs.unlinkSync(offers.image.path);
                } catch (error) {

                }
            }

            // Update the image details
            const originalFilename = req.file.originalname;
            const extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            const imageFilename = `${name.replace(/[#$%]/g, '').replace(/\s/g, '_')}${extension}`;
            const imagePath = 'imageUploads/backend/offers/' + imageFilename;

            fs.renameSync(req?.file?.path, imagePath);

            offers.image = imagePath;
        }

        await offers.save();
        res.status(200).json({ type: "success", message: "Offers updated successfully!" });

    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
        console.log(error)
    }
});


// get wishlist from wishlist Model
const getWishList = async (userId) => {
    try {
        if (userId != "0") {
            const wishList = await Wishlist.find({ user: userId }, 'product');
            return wishList.map((item) => item.product?.toString());
        }
        else {
            return []
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

// home offer product get 
route.get('/products/get/byoffers', async (req, res) => {
    try {
        const offers = await Offers.find();
        const userId = req.query?.userId

        let user
        if (userId !== "0") {
            user = await User.findById(userId);
        }

        const data = [];

        for (const offer of offers) {

            if (!offer.status) {
                continue; // Skip offers with status set to false
            }

            const products = await Product.find({ Offers: offer.name, Product_Status: true }).populate('Category', 'categoryName')
                .populate({
                    path: 'Sub_Category',
                    select: 'subCategoryName',
                })
                .populate({
                    path: 'Variation',
                    select: '-__v',
                })

            const userWishlist = await getWishList(userId);
            let result = []

            // if (products.length === 0) {
            //     return res.status(200).json({ type: 'warning', message: 'No products found for the given category!', products: [] });
            // } else {
            result = products.map(product => ({
                _id: product._id,
                Product_Name: product.Product_Name,
                SKU_Code: product.SKU_Code,
                Product_Image: `${process.env.IMAGE_URL}/${product?.Product_Image?.replace(/\\/g, '/')}`,
                Category: product.Category?.categoryName,
                CategoryId: product.Category?._id,
                Product_Ori_Price: product?.Variation?.[0]?.Variation_Size?.[0]?.Disc_Price,
                Product_Dis_Price: (user?.User_Type === '0' || userId === "0"
                    ? (product?.Variation?.[0]?.Variation_Size?.[0]?.R0_Price)
                    : (user?.User_Type === '1' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R1_Price :
                        (user?.User_Type === '2' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R2_Price : (user?.User_Type === '3' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R3_Price : product?.Variation?.[0]?.Variation_Size?.[0]?.R4_Price)))),
                Description: product.Description,
                isFavorite: userWishlist.includes(product._id?.toString())
            }));
            // }

            data.push({
                name: offer?.name || "",
                id: offer?._id,
                image: `${process.env.IMAGE_URL}/${offer?.image?.replace(/\\/g, '/')}`,
                // products: result || []
            });
        }

        res.status(200).json({ type: "success", message: "Offers Status update successfully!", data: data || [] });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
        console.log(error);
    }
});

// get all product for particular home offer (by id) 
route.get('/products/get/byoffers/:offerId', async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const offer = await Offers.findById(offerId);

        if (!offer) {
            return res.status(404).json({ type: 'warning', message: 'Offer not found!' });
        }

        if (!offer.status) {
            return res.status(200).json({ type: 'warning', message: 'Offer is disabled!', products: [] });
        }

        const products = await Product.find({ Offers: offer.name, Product_Status: true }).populate('Category', 'categoryName')
            .populate({
                path: 'Sub_Category',
                select: 'subCategoryName',
            })
            .populate({
                path: 'Variation',
                select: '-__v',
            });

        const userId = req.query?.userId;
        let userWishlist = [];
        let user
        if (userId !== "0") {
            user = await User.findById(userId);
            userWishlist = await getWishList(userId);
        }

        const result = products.map(product => ({
            _id: product._id,
            Product_Name: product.Product_Name,
            SKU_Code: product.SKU_Code,
            Product_Image: `${process.env.IMAGE_URL}/${product?.Product_Image?.replace(/\\/g, '/')}`,
            Category: product.Category?.categoryName,
            CategoryId: product.Category?._id,
            Product_Ori_Price: product?.Variation?.[0]?.Variation_Size?.[0]?.Disc_Price,
            Product_Dis_Price: (user?.User_Type === '0' || userId === "0"
                ? (product?.Variation?.[0]?.Variation_Size?.[0]?.R0_Price)
                : (user?.User_Type === '1' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R1_Price :
                    (user?.User_Type === '2' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R2_Price : (user?.User_Type === '3' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R3_Price : product?.Variation?.[0]?.Variation_Size?.[0]?.R4_Price)))),
            Description: product.Description,
            isFavorite: userWishlist.includes(product._id?.toString())
        }));

        res.status(200).json({ type: "success", message: "Products retrieved successfully!", data: result || [] });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Server Error!", errorMessage: error });
        console.log(error);
    }
});


module.exports = route
