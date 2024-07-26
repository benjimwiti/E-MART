import Product from "../models/productModel.js"

export const findProductById = async (productId) => {
    try {
        const product = await Product.findById(productId)
        if (!product) throw new Error(`product does not exist in database`)
        return product
    } catch (error) {
        throw new Error(`product sevice error ; ${err.message}`)
    }
}