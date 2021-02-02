const productModel = require('../models/Product')

// exports.hello = (req,res) => {
//     res.send('안녕하세요')
// };

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productModel.create(req.body);
        // console.log('createdProduct', createdProduct)
        res.status(201).json(createdProduct);    
    } catch (error) {
        next(error)
    }
};