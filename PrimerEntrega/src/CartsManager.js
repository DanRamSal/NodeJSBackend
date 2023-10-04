import { existsSync, promises } from "fs";
import { productsManager } from "./ProductManager";
const path = "ProductsFile.json";

class CartsManager {
  async getCarts() {
    try {
      if (existsSync(path)) {
        const cartsFile = await promises.readFile(path, "utf-8");
        const cartsData = JSON.parse(productsFile);
        return limit ? productsData.slice(0, + limit) : productsData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const products = await this.getCarts({});
      const cart = carts.find((p) => p.id === id);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createCart(){
    try{
      const carts = await this.getcartById({});
      let id;
      if(!carts.length){
        id = 1;
      } else{
        id = carts[carts.length - 1].id + 1;
      }

      const newCart = {id,products: []};
      carts.push(newCart);
      await promises.writeFile(path, JSON.stringify(carts));
      return newCart;
    }
    catch(error){
      return error;
    }
  }

  async addProductToCart(idCart,idProduct){
    const cart = await this.getCartById(idCart)
    if(!cart){
        throw new Error('There is no cart with this ID')
    }
    const prodct = await productsManager.getProductById(idProduct);    
    if(!product)
    {throw new Error('There is no product with this ID')}
    const productIndex = cart.products.findIndex(p=>p.id === idProduct)
    if(productIndex === -1)
    {
        const newProduct = {id:idProduct, quantity:1};
        cart.products.push(newProduct);
    }
    else
    {
      cart.products[productIndex].quantity++;
    }
  }
}

export const cartsManager = new CartsManager();