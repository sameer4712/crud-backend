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

export const deleteCategory = async(req,res)=>{
    try{
        const categoryId = req.params.id
        await productDetails.deleteMany({category:categoryId})
        await CategoryDetails.deleteOne({_id:categoryId})
        return res.json({message:"Category and all the products in the category"})
    }
    catch(err)
    {
        res.json(err)
    }
}

// export const editCategory = async(req,res)=>{

// }
