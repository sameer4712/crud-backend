import productDetails from "../models/productModel.js";
import userDetails from "../models/userModel.js";
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
    res.json({ message: "Product added succesfully", product: product })
}

// Show All products
export const showProduct = async (req, res) => {
    try {

        const product = await productDetails.aggregate([
            {
                $lookup: {
                    from: "categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "categoryDetails"
                },
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    stock: 1,
                    image: 1,
                    description: 1,
                    category: 1,
                    category: "$categoryDetails.name"
                }
            }
        ])
        res.json(product)
    }
    catch (err) {
        res.json(err)
    }
}

// Show one product
export const OneProduct = async (req, res) => {
    try {
        const Id = req.params.id
        const product = await productDetails.findById({ _id: Id }, { name: 1, price: 1, category: 1, description: 1, _id: 1, image: 1 })
        res.json({ message: "The searched product is", product: product })
    }
    catch (err) {
        console.log(err);

    }

}

// search product

export const SearchProduct = async (req, res) => {
    try {
        const regex = new RegExp(req.params.query, 'i');
        const product = await productDetails.find({ name: regex })
        res.json(product)

    }
    catch (err) {
        res.json({ message: "Search is failed" })

    }
}

// Edit A product
export const EditProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const oldProduct = await productDetails.findById(id)
        if (!oldProduct) {
            return res.json({ message: "There is no such product to edit.." })
        }

        if (!req.body.category || req.body.category == "undefined") delete req.body.category

        const newProduct = {
            ...oldProduct.toJSON(),
            ...req.body
        }

        if (req.file) {
            newProduct.image = req.file.filename
        }

        const updatedProduct = await productDetails.findByIdAndUpdate(id, newProduct)
        res.json({ message: "Updated product is", product: newProduct })

    }
    catch (err) {
        console.log(err)
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

export const PageRouting = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const prod = await productDetails.aggregate([
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "categories",     
                    localField: "category",
                    foreignField: "_id",  
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $project: {
                    name: 1,
                    price: 1,
                    image: 1,
                    stock: 1,
                    description: 1,
                    category: "$category.name",
                },
            },
        ]);

        const total = await productDetails.countDocuments();

        res.json({
            prod,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalProducts: total,
        });
    } catch (error) {
        console.error(error);
        res.json({ error: "Failed to fetch products" });
    }
};