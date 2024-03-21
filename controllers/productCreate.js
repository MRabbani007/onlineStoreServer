const product = require("../db_schemas/product");

const handleProductCreate = async (req, res) => {
  try {
    console.log("first");
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const clientProduct = payload?.product;

      console.log("Product Create:", clientProduct.name);

      // const data = await product.findOne({ id: clientProduct.id });
      if (false) {
        return res
          .status(204)
          .json({ status: "failed", message: "product ID already exists" });
      } else {
        // save data into db
        const newProduct = new product({
          id: crypto.randomUUID(),
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
          imagesURL: clientProduct.imagesURL,
          about: clientProduct.about,
          details: clientProduct.details,
          purchased: 0,
          createDate: Date(),
          visible: "supplier",
        });
        // save request to db
        await newProduct.save();
        console.log("Product added");
        return res.status(200).json({ status: "success" });
      }
    } else {
      return res.status(204).json({ status: "failed", message: "No action" });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = handleProductCreate;
