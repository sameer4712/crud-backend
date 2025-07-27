import productDetails from "../models/productModel.js";
import { category } from "./categoryController.js";

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
        image: F
    })
    await product.save()
    res.json({ message: "Product added succesfully", product: name })
}

// Show All products
export const showProduct = async (req, res) => {
    const products = await productDetails.find()
    res.json(products)
}

// Show one product
export const OneProduct = async (req, res) => {
    try {
        const Id = req.params.id
        const product = await productDetails.findById({ _id: Id })
        res.json({ message: "The searched product is", product: product })
    }
    catch (err) {
        console.log(err);

    }

}

// Edit A product
export const EditProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const oldProduct = await productDetails.findById(id)
        if (!oldProduct) {
            res.json({ message: "There is no such product to edit.." })
        }
        const newProduct = ({
            name: oldProduct.name,
            price: oldProduct.price,
            stock: oldProduct.stock,
            description: oldProduct.description,
            category: oldProduct.category,
            image: oldProduct.image
        })
        if (req.body.name) {
            newProduct.name = req.body.name
        }
        if (req.body.price) {
            newProduct.price = req.body.price
        }
        if (req.body.name) {
            newProduct.description = req.body.description
        }
        if (req.body.name) {
            newProduct.stock = req.body.stock
        }
        if (req.body.name) {
            newProduct.category = req.body.category
        }
        if (req.file) {
            newProduct.image = req.file.filename
        }
        const updatedProduct = await productDetails.findByIdAndUpdate(id,newProduct)
        res.json({message:"Updated product is",product:updatedProduct})

    }
    catch (err) {
        res.json({ message: "There is no such product" })
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const productDelete = await productDetails.findByIdAndDelete({ _id: id })
        res.json({ message: "Product Deleted Succesfully..", id: productDelete })
    }
    catch (err) {
        res.json({ message: "No such product could find" })
    }


}