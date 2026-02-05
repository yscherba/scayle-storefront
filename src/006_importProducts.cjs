const SwaggerClient = require("swagger-client");
require("dotenv").config();

const Papa = require("papaparse");
const fs = require("fs");

// Create a product according to the documentation found here: https://scayle.dev/en/dev/admin-api/create-product
// Learn more about the product structure here: https://scayle.dev/en/dev/admin-api/product-overview
async function createProduct(client, data) {
  const productName = JSON.parse(data.name) || "Default Product Name";
  const colorName = JSON.parse(data.color) || "Default Product color";
  const prices = JSON.parse(data.price);
  const taxes = JSON.parse(data.tax);
  const currencies = JSON.parse(data.currencyCode);
  const countries = JSON.parse(data.countryCode);
  const warehouses = JSON.parse(data.warehouse);

  const newProduct = {
    referenceKey: data.referenceKey,
    name: {
      de_DE: productName.de,
      en_GB: productName.gb,
      en_US: productName.us,
    },
    state: data.state, // live or draft
    master: {
      referenceKey: `${data.referenceKey}-master`, // Usually we would receive a master key and not set it like this
      categories: {
        paths: [data.categories.split(",")], // These categories need to be defined beforehand
      },
    },
    attributes: [
      {
        name: "color", // This attribute group needs to be present
        type: "localizedString",
        value: {
          de_DE: colorName.de, // these attribute values will automatically be created if they don't exist
          en_GB: colorName.gb,
          en_US: colorName.us,
        },
      },
    ],
    images: data.imageSource.split(",").map((imageSource) => {
      return {
        source: {
          url: imageSource.trim(), // Make sure that the URL contains the filetype ({filename}.png/jpg)
        },
      };
    }),
    // Create variants for each size and country combination
    variants: [],
  };

  // Create variants for each size and country
  const sizes = data.size.split(",");
  const countryKeys = Object.keys(countries);

  for (const size of sizes) {
    for (const countryKey of countryKeys) {
      const countryCode = countries[countryKey];
      const variant = {
        referenceKey: `${data.referenceKey}-${size}-${countryCode}`,
        attributes: [
          {
            name: "size",
            type: "localizedString",
            value: {
              de_DE: size,
              en_GB: size,
              en_US: size,
            },
          },
        ],
        prices: [
          {
            price: parseInt(prices[countryKey]), // Make sure to pass decimals like 3900 (39,00 EUR)
            tax: parseFloat(taxes[countryKey]),
            currencyCode: currencies[countryKey],
            countryCode: countryCode,
          },
        ],
        stocks: [
          {
            quantity: parseInt(data.quantity),
            warehouseReferenceKey: warehouses[countryKey],
            changedAt: "2024-01-26T00:00:00+00:00",
            merchantReferenceKey: "default",
          },
        ],
      };
      newProduct.variants.push(variant);
    }
  }

  try {
    let response = await client.apis.Products.createProduct(
      {},
      { requestBody: newProduct }
    );
    let createdProduct = response.body;
    console.log("Created Product:", createdProduct);
  } catch (error) {
    console.error("Unable to create product", error.response.body.errors);
  }
}

// Import products from our products.csv file
// The CSV is simplified. In a production import you would probably have a different way of importing the data from your system.
// This is a general demonstration on how to use the Admin API to create products in SCAYLE.
async function importProducts() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });
  fs.readFile("./data/products.csv", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the CSV file:", err);
      return;
    }

    Papa.parse(data, {
      // Makes sure that we get the data as an array of objects
      // in the format {referenceKey: "THS1234", name: "Hilfiger Shirt", ...}
      header: true,
      complete: function (results) {
        for (const product of results.data) {
          createProduct(client, product);
        }
      },
      error: function (error) {
        console.log("Unable to parse products.csv", error);
      },
    });
  });
}

importProducts();
