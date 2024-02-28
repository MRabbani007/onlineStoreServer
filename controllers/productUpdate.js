const product = require("../db_schemas/product");

const handleProductUpdate = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const clientProduct = payload?.product;

      console.log("Product Update:", clientProduct.id);

      const data = await product
        .updateOne(
          { id: clientProduct.id },
          {
            $set: {
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
            },
          }
        )
        .exec();

      if (data.acknowledged) {
      }

      return res
        .status(200)
        .json({ status: "success", message: "Product Updated" });
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
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = handleProductUpdate;
