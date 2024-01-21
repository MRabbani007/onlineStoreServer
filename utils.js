const fs = require("node:fs");

const ITEMS_PER_PAGE = 10;

// TODO: Remove
const readLocalData = (fileName = "product.txt") => {
  let filedata = [];
  fs.readFileSync("./" + fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      filedata = JSON.parse(data);
    }
  });
  return filedata;
};

// TODO: Remove
const writeLocalData = async (data, fileName = "product.txt") => {
  const content = JSON.stringify(data);
  fs.writeFile("./" + fileName, content, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    return true;
  });
};

module.exports = { ITEMS_PER_PAGE };
