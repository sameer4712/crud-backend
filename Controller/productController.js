import productDetails from "../models/productModel.js";

// Add product
export const addProduct = async (req, res) => {
    let F = ""
    if (req.file) {
        F = req.file.filename
    }
    const { name, description, stock, category, price } = req.body;
    console.log(req.body)
    const product = new productDetails({
        name: name,
        description: description,
        stock: stock,
        category: category,
        price: price,
        image:F
    })
    await product.save()
    res.json({ message: "Product added succesfully" })

    
}