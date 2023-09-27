import { existsSync, promises } from "fs";
import { createHash } from "crypto";
const path = "ProductsFile.json";

class ProductsManager {
  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (existsSync(path)) {
        const productsFile = await promises.readFile(path, "utf-8");
        const productsData = JSON.parse(productsFile);
        return limit ? productsData.slice(0, +limit) : productsData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts({});
      const product = products.find((p) => p.id === id);
      return product;
    } catch (error) {
      return error;
    }
  }
}

export const manager = new ProductsManager();