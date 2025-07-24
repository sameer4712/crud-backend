import productDetails from "../models/productModel.js";

// Add product
export const addProduct = async (req, res) => {
    let p = ""
    if (req.file) {
        p = req.file.filename
    }
    const { Name,Description,Stock,Category,Price} = req.body;
    const product = new productDetails({
        name: Name,
        description: Description,
        stock:Stock,
        category: Category,
        price:Price
    })
    await product.save()
    res.json({ message: "Product added succesfully" })
}