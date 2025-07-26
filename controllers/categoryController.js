import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import Category from "../models/categoryModel.js";
import slugify from "slugify";

// create category

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new Category({
      name,
      slug: slugify(name),
      image,
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category creation",
    });
  }
};


// update category

export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), image },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in category update",
    });
  }
};


// get all category

export const allCategory=async(req,res)=>{
  try {
     const category=await categoryModel.find({})
     return res.status(200).send({
      success: true,
      message: "data find suucefull ",
      category
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in fetching data ",
    });
  }
}

// single category

export const singleCategory=async(req,res)=>{
  try {
    const { id } = req.params;
     const category=await categoryModel.findById(id)
     return res.status(200).send({
      success: true,
      message: "data find suucefull ",
      category
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in fetching data ",
    });
  }
}

// delete categry
export const delteCategory=async(req,res)=>{
  try {
    const { id } = req.params;
     const category=await categoryModel.findByIdAndDelete(id)
     return res.status(200).send({
      success: true,
      message: "data delete suucefull ",
      category
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in fetching data ",
    });
  }
}