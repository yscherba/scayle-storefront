const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createAndAttachWarehouse() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const newWarehouses = [
    {referenceKey: "yscherbaWarehouseUs"},
    {referenceKey: "yscherbaWarehouseDe"},
    {referenceKey: "yscherbaWarehouseGb"},
  ];

  let createdWarehouses = []; // we need to store the created warehouse to attach the merchant to it
  for (const newWarehouse of newWarehouses) {
    try {
      const response = await client.apis.Warehouses.createWarehouse(
        {},
        { requestBody: newWarehouse }
      );
      createdWarehouses.push(response.body);
    } catch (error) {
      console.error(
        "Unable to create shop country warehouse",
        error.response.body.errors
      );
      process.exit(1);
    }
}

  for (const createdWarehouse of createdWarehouses){
    try {
      const response = await client.apis.Warehouses.attachMerchantWarehouse({
        merchantIdentifier: 1, // default warehouse that is created with the instance
        warehouseIdentifier: createdWarehouse.id,
      });
      console.log("Attached Merchant to Warehouse", response.body);
    } catch (error) {
      console.error(
        "Unable to attach merchant to warehouse",
        error.response.body.errors
      );
      process.exit(1);
    }
  }

  // Create shop country warehouses for all countries
  const shopCountryWarehouses = [
    {
      countryCode: "us",
      referenceKey: "yscherbaWarehouseUs",
      priority: 100,
    },
    {
      countryCode: "gb",
      referenceKey: "yscherbaWarehouseGb",
      priority: 100,
    },
    {
      countryCode: "de",
      referenceKey: "yscherbaWarehouseDe",
      priority: 100,
    }
  ];

  for (const shopCountryWarehouse of shopCountryWarehouses) {
    try {
      const response = await client.apis.Warehouses.createShopCountryWarehouse(
        {
          shopKey: "ys",
          countryCode: shopCountryWarehouse.countryCode,
        },
        {
          requestBody: {
            referenceKey: shopCountryWarehouse.referenceKey,
            priority: shopCountryWarehouse.priority,
          },
        }
      );

      const createdShopCountryWarehouse = response.body;
      console.log(`Created Shop Country Warehouse for ${shopCountryWarehouse.countryCode.toUpperCase()}:`, createdShopCountryWarehouse);
    } catch (error) {
      console.error(`Unable to create warehouse for ${shopCountryWarehouse.countryCode}:`, error.response.body.errors);
      process.exit(1);
    }
  }
}

createAndAttachWarehouse();
