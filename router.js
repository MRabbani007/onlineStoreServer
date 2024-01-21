const express = require("express");
const router = express();
// Import Product Functions
const {
  fetchDBProductID,
  fetchDBProductName,
  fetchDBProductNameCategory,
  fetchDBCreateProduct,
  fetchDBUpdateProduct,
} = require("./functions/productFunctions");
// Import User Functions
const { signUpUser, signInUser } = require("./functions/userFunctions");
// Import Cart Functions
const { handleCartRequests } = require("./functions/cartFunctions");
// Import Order Functions
const { handleOrderRequests } = require("./functions/orderFunctions");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/", (req, res) => {
  res.json("get users");
});

// Signin Request
router.post("/signin", async (req, res) => {
  // TODO: Implement Signin
  let result = "";
  // get username and password from client
  let clientusername = req.body.username;
  let clientpassword = req.body.password;
  console.log("Signin Request", clientusername, clientpassword);
  result = (await signInUser(clientusername, clientpassword)) || "error";
  res.json(result);
});

// Signup Request
router.post("/signup", async (req, res) => {
  // TODO: Implement Signup
  let result = "";
  // get username and password from client
  let clientusername = req.body.username;
  let clientpassword = req.body.password;
  console.log("Signup Request", clientusername, clientpassword);
  result = await signUpUser(clientusername, clientpassword);
  res.json(result);
});

// TODO: Remove
// Display all products
router.post("/products/all", (req, res) => {
  let result = [];
  let page = req.body.page;
  if (!page) {
    page = 1;
  }
  result = getAllProducts(page);
  res.json({ products: result.result, count: result.count });
});

// Get Product by ID
router.post("/products/id", async (req, res) => {
  let result = null;
  let productID = req.body.productID;
  console.log("Request productid: " + productID);
  result = await fetchDBProductID(productID);
  res.json(result);
});

// Create New Product
router.post("/products/create", async (req, res) => {
  let product = req.body.product;
  console.log("Create Product:" + product.id);
  let result = await fetchDBCreateProduct(product);
  res.json(result);
});

// Create New Product
router.post("/products/update", async (req, res) => {
  let product = req.body.product;
  console.log("Update Product:" + product.id);
  let result = await fetchDBUpdateProduct(product);
  res.json(result);
});

// Search Request
router.post("/products/search", async (req, res) => {
  let result = [];
  let temp = [];
  let searchCat = req.body.searchCat;
  let searchQuery = req.body.searchQuery;
  let page = req.body.page || 1;
  if (searchCat === "all" || searchCat === "All") {
    searchCat = "";
  }
  console.log("Request search: ", searchCat, searchQuery);
  // temp = searchProducts(searchCat, searchQuery, page);
  temp = await fetchDBProductNameCategory(searchQuery, searchCat, page);
  // console.log(temp);
  // res.json({ products: temp, count: temp.length });
  res.json(temp);
});

// Handle Cart Requests
router.post("/user/cart", async (req, res) => {
  let cartOption = req.body.cartOption;
  let userName = req.body.userName;
  let cartData = req.body.cartData;
  console.log("Cart request:", cartOption);
  let result = (await handleCartRequests(cartOption, userName, cartData)) || [];
  res.json(result);
});

router.post("/user/order", async (req, res) => {
  let orderOption = req.body.orderOption;
  let userName = req.body.userName;
  let orderData = req.body.orderData;
  console.log("Order request:", orderOption);
  let result =
    (await handleOrderRequests(orderOption, userName, orderData)) || [];
  res.json(result);
});

module.exports = router;
