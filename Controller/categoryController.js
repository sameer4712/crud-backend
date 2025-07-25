import CategoryDetails from "../models/categoryModel.js";

export const category = async (req, res) => {
    const { name, description } = req.body
    const addCategory = new CategoryDetails({
        name: name,
        description: description
    })
    await addCategory.save()
    res.json("Category added successfully")
}