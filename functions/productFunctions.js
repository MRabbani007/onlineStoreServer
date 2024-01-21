const product = require("../dbSchemas/product");
const ITEMS_PER_PAGE = 10; // require("../utils");

// get product by ID
const fetchDBProductID = async (productID) => {
  try {
    const data = await product.find({ id: productID }).limit(1);
    return data[0];
  } catch (error) {
    return "Error: Product Get";
  }
};

// Search product by name
const fetchDBProductName = async (query, page = 1) => {
  try {
    let temp = await product.find({ name: { $regex: query, $options: "i" } });
    let count = temp.length;
    let data = await product
      .find({ name: { $regex: query, $options: "i" } })
      .skip(ITEMS_PER_PAGE * (page - 1))
      .limit(ITEMS_PER_PAGE);
    return { products: data, count: count };
  } catch (error) {
    return "Error: Product Search";
  }
};

// Search product by name and category
const fetchDBProductNameCategory = async (query, category, page = 1) => {
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

// Create New Product
const fetchDBCreateProduct = async (clientProduct) => {
  try {
    let result = "";
    const data = await product.find({ id: clientProduct.id });
    if (data.length !== 0) {
      result = "already exists";
    } else {
      // save data into db
      const newProduct = new product({
        id: clientProduct.id,
        name: clientProduct.name,
        category: clientProduct.category,
        rating: {
          stars: clientProduct.rating.stars,
          count: clientProduct.rating.count,
        },
        reviews: clientProduct.reviews,
        priceCents: clientProduct.priceCents,
        supplier: clientProduct.supplier,
        properties: clientProduct.properties,
        values: clientProduct.values,
        images: clientProduct.images,
        imagesNames: clientProduct.imagesNames,
        imagesBasedOn: clientProduct.imagesBasedOn,
        about: clientProduct.about,
        details: clientProduct.details,
      });
      // save request to db
      await newProduct.save();
      console.log("Product added");
      result = "Product added";
      return result;
    }
  } catch (error) {
    console.log(error);
    return "create product error";
  }
};

const fetchDBUpdateProduct = async (clientProduct) => {
  try {
    let result = "";
    // const data = await product.find({ id: clientProduct.id });
    if (true) {
      const newProduct = new product({
        id: clientProduct.id,
        name: clientProduct.name,
        category: clientProduct.category,
        rating: {
          stars: clientProduct.rating.stars,
          count: clientProduct.rating.count,
        },
        reviews: clientProduct.reviews,
        priceCents: clientProduct.priceCents,
        supplier: clientProduct.supplier,
        properties: clientProduct.properties,
        values: clientProduct.values,
        images: clientProduct.images,
        imagesNames: clientProduct.imagesNames,
        imagesBasedOn: clientProduct.imagesBasedOn,
        about: clientProduct.about,
        details: clientProduct.details,
      });
      await product.replaceOne({ id: clientProduct.id }, clientProduct);
      return "Product updated";
    } else {
      // save data into db
      // const newProduct = new product({
      //   id: clientProduct.id,
      //   name: clientProduct.name,
      //   category: clientProduct.category,
      //   rating: {
      //     stars: clientProduct.rating.stars,
      //     count: clientProduct.rating.count,
      //   },
      //   reviews: clientProduct.reviews,
      //   priceCents: clientProduct.priceCents,
      //   supplier: clientProduct.supplier,
      //   properties: clientProduct.properties,
      //   values: clientProduct.values,
      //   images: clientProduct.images,
      //   imagesName: clientProduct.imagesNames,
      //   imagesBasedOn: clientProduct.imagesBasedOn,
      //   about: clientProduct.about,
      // });
      // // save request to db
      // newProduct.save().then(() => {
      //   result = "added";
      //   console.log("Product added");
      //   return result;
      // });
      return "Product Not Found";
    }
  } catch (error) {
    console.log(error);
    return "Update product error";
  }
};

module.exports = {
  fetchDBProductID,
  fetchDBProductName,
  fetchDBProductNameCategory,
  fetchDBCreateProduct,
  fetchDBUpdateProduct,
};
