import Product from "../models/product.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name, brand, retail_price, release_date, description, category } =
      req.body;

    // const img_path = req.file.filename;

    const newProduct = new Product({
      name,
      slug: slugify(name),
      brand,
      retail_price,
      release_date,
      description,
      img_path: req.body.img_path,
      category,
    });

    const saved = await newProduct.save();

    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$result", 0],
              },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $project: {
          result: 0,
        },
      },
      {
        $addFields: {
          release_date: {
            $dateToString: {
              format: "%d/%m/%Y",
              date: "$release_date",
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    var i = 1;

    for (let product of products) {
      product.products_id = i;
      i++;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllBase = async (req, res) => {
  try {
    const product = await Product.find();
    if (product && product.length > 0) {
      return res.json(product);
    }
  } catch (error) {}
};

export const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
export const deleteById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
