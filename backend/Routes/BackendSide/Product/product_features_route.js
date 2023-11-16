const express = require('express');
const route = express.Router();
const User = require('../../../Models/FrontendSide/user_model')
const { Product, Variation } = require('../../../Models/BackendSide/product_model')
const Wishlist = require('../../../Models/FrontendSide/wish_list_model');

// get wishlist from wishlist Model
const getWishList = async (userId) => {
    try {
        if (userId != "0") {
            const wishList = await Wishlist.find({ user: userId }, 'product');
            return wishList.map((item) => item.product?.toString());
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};


// get all product for particular category (mobile) 
route.get('/mob/get/productlist/:id', async (req, res) => {
    const categoryId = req.params.id;
    const userId = req?.query?.userId
    const productId = req?.query?.productId

    let user

    if (userId != "0") {
        user = await User.findById(userId);
    }

    try {
        let SimilarProducts = await Product.find({ Category: categoryId, Product_Status: true })
            .limit(10)
            .populate('Category', 'Category_Name')
            .populate({
                path: 'Variation',
                select: '-__v',
            })
        SimilarProducts = SimilarProducts?.filter((product) => product?._id?.toString() !== productId)

        let YouMayAlsoLike = await Product.find({ Product_Status: true })
            .limit(10)
            .populate('Category', 'Category_Name')
            .populate({
                path: 'Variation',
                select: '-__v',
            })
        YouMayAlsoLike = YouMayAlsoLike?.filter((product) => product?._id?.toString() !== productId)

        let ResultSimilarProducts = []
        let ResultYouMayAlsoLike = []

        const userWishlist = await getWishList(userId);

        {
            ResultSimilarProducts = SimilarProducts.map(product => ({
                _id: product._id,
                Product_Name: product.Product_Name,
                SKU_Code: product.SKU_Code,
                Product_Image: `${process.env.IMAGE_URL}/${product?.Product_Image?.replace(/\\/g, '/')}`,
                Category: product.Category?.categoryName,
                Product_Ori_Price: product?.Variation?.[0]?.Variation_Size?.[0]?.Disc_Price,
                Product_Dis_Price: (user?.User_Type === '0' || userId === "0"
                    ? (product?.Variation?.[0]?.Variation_Size?.[0]?.R0_Price)
                    : (user?.User_Type === '1' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R1_Price :
                        (user?.User_Type === '2' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R2_Price : (user?.User_Type === '3' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R3_Price : product?.Variation?.[0]?.Variation_Size?.[0]?.R4_Price)))),
                Description: product.Description,
                isFavorite: userId == "0" ? false : userWishlist?.includes(product._id?.toString())
            }));
        }

        {
            ResultYouMayAlsoLike = YouMayAlsoLike.map(product => ({
                _id: product._id,
                Product_Name: product.Product_Name,
                SKU_Code: product.SKU_Code,
                Product_Image: `${process.env.IMAGE_URL}/${product?.Product_Image?.replace(/\\/g, '/')}`,
                Category: product.Category?.categoryName,
                Product_Ori_Price: product?.Variation?.[0]?.Variation_Size?.[0]?.Disc_Price,
                Product_Dis_Price: (user?.User_Type === '0' || userId === "0"
                    ? (product?.Variation?.[0]?.Variation_Size?.[0]?.R0_Price)
                    : (user?.User_Type === '1' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R1_Price :
                        (user?.User_Type === '2' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R2_Price : (user?.User_Type === '3' ? product?.Variation?.[0]?.Variation_Size?.[0]?.R3_Price : product?.Variation?.[0]?.Variation_Size?.[0]?.R4_Price)))),
                Description: product.Description,
                isFavorite: userId == "0" ? false : userWishlist?.includes(product._id?.toString())
            }));
        }
        res.status(200).json({ type: 'success', message: 'Products found successfully!', YouMayAlsoLike: ResultYouMayAlsoLike || [], SimilarProducts: ResultSimilarProducts || [] });

    } catch (error) {
        res.status(500).json({ type: 'error', message: 'Server Error!', errorMessage: error });
        console.log(error)
    }
});


module.exports = route
