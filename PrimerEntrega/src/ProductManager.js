import { existsSync, promises } from "fs";
const path = "ProductsFile.json";

class ProductsManager {
  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (existsSync(path)) {
        const productsFile = await promises.readFile(path, "utf-8");
        const productsData = JSON.parse(productsFile);
        return limit ? productsData.slice(0, + limit) : productsData;
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

  async createProduct(product){
    try{
      const products = await this.getProductById({});
      let id;
      if(!products.length){
        id = 1;
      } else{
        id = products[products.length - 1].id + 1;
      }

      const newProduct = {id,...product};
      products.push(newProduct);
      await promises.writeFile(path, JSON.stringify(products));
      return newProduct;
    }
    catch(error){
      return error;
    }
  }
}

export const productsManager = new ProductsManager();