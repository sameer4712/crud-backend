import CategoryDetails from "../models/categoryModel.js";
import productDetails from "../models/productModel.js";

export const category = async (req, res) => {
    const { name, description } = req.body
    const addCategory = new CategoryDetails({
        name: name,
        description: description
    })
    await addCategory.save()
    res.json("Category added successfully")
}


export const editCategory = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body
    const oldOne = await CategoryDetails.findById({ _id: id })
    if (!oldOne) {
        res.json({ message: "There is no such Category" })
    }
    const newCategory = ({
        name: oldOne.name,
        description: oldOne.description
    })
    if (req.body.name) {
        newCategory.name = req.body.name
    }
    if (req.body.description) {
        Category.description = req.body.description
    }
    const updatedCategory = await CategoryDetails.findByIdAndUpdate(id, newCategory)
    res.json({ message: "Category updated Successfull", category: updatedCategory })
}


export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        await productDetails.deleteMany({ category: categoryId })
        await CategoryDetails.deleteOne({ _id: categoryId })
        return res.json({ message: "Category and all the products in the category" })
    }
    catch (err) {
        res.json(err)
    }
}

export const oneCategory = async (req, res) => {
    const id = req.params.id
    const show = await CategoryDetails.findById({ _id: id })
    res.json({ message: "The selected category is", category: show })
}

export const showCategory = async (req, res) => {
    const show = await CategoryDetails.find()
    res.json({ message: "All category are", category: show })
}

