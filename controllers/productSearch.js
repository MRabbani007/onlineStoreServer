const { ITEMS_PER_PAGE } = require("../data/variables");
const product = require("../db_schemas/product");

const handleProductSearch = async (req, res) => {
  try {
    const action = req?.body?.action;
    if (action) {
      const { type, payload } = action;
      let { searchCat, searchQuery, activePage } = payload;
      console.log("Request search: ", searchCat, searchQuery);
      if (searchCat === "all" || searchCat === "All") {
        searchCat = "";
      }
      let temp = await product.find({
        name: { $regex: searchQuery, $options: "i" },
        category: { $regex: searchCat, $options: "i" },
      });
      let count = temp.length;
      let data = await product
        .find({
          name: { $regex: searchQuery, $options: "i" },
          category: { $regex: searchCat, $options: "i" },
        })
        .limit(ITEMS_PER_PAGE)
        .skip(ITEMS_PER_PAGE * (activePage - 1));
      return res.status(200).json({ products: data, count: count });
    } else {
      return res.status(204).json({ status: "failed", message: "no action" });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Search product by name
const searchProductName = async (searchQuery, searchCat, page) => {
  try {
    let temp = await product.find({
      name: { $regex: searchQuery, $options: "i" },
    });
    let count = temp.length;
    let data = await product
      .find({ name: { $regex: searchQuery, $options: "i" } })
      .skip(ITEMS_PER_PAGE * (page - 1))
      .limit(ITEMS_PER_PAGE);
    return { products: data, count: count };
  } catch (error) {
    return { status: "error", message: "Error: Product Search" };
  }
};

// Search product by name and category
const searchNameCategory = async (query, category, page = 1) => {
  try {
    let temp = await product.find({
      name: { $regex: query, $options: "i" },
      category: { $regex: category, $options: "i" },
    });
    let count = temp.length;
    let data = await product
      .find({
        name: { $regex: query, $options: "i" },
        category: { $regex: category, $options: "i" },
      })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return { products: data, count: count };
  } catch (error) {
    return "Error: Product Search";
  }
};

module.exports = handleProductSearch;
