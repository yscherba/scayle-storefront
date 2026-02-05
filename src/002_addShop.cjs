const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function addShop() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });
  const shop = {
    name: "yScherba Test Shop",
    key: "ys", // Must be 2 chars long
    logoUrl: "http://www.example.com/myLogo.png",
    countries: [
      {
        countryCode: "us", // en,gb,de,fr,es
        defaultLanguageCode: "en_US", // en_GB,en_US,de_DE,fr_FR,es_ES
        currencyCode: "USD", // USD,EUR,GBP,JPY,CHF
        url: "http://www.yScherbaUs-Test-Shop.com",
      },
      {
        countryCode: "gb", // en,gb,de,fr,es
        defaultLanguageCode: "en_GB", // en_GB,en_US,de_DE,fr_FR,es_ES
        currencyCode: "GBP", // USD,EUR,GBP,JPY,CHF
        url: "http://www.yScherbaGb-Test-Shop.com",
      },
      {
        countryCode: "de", // en,gb,de,fr,es
        defaultLanguageCode: "de_DE", // en_GB,en_US,de_DE,fr_FR,es_ES
        currencyCode: "EUR", // USD,EUR,GBP,JPY,CHF
        url: "http://www.yScherbaDe-Test-Shop.com",
      }
    ],
  };
  try {
    let response = await client.apis.Shops.createShop(
      {},
      { requestBody: shop }
    );
    let createdShop = response.body;
    console.log("Created Shop", createdShop);
  } catch (error) {
    console.error("Status Code: ", error.response.status);
    console.error("Returned errors", error.response.body.errors);
  }
}

addShop();