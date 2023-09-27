import express from "express";
import { manager } from "./ProductManager.js";

const app = express();

app.use(express.json());

app.get('/',(re,res)=>{
  res.send('Hola')
})

// req => params - query - body
app.get("/api/products", async (req, res) => {
  try {
    const users = await manager.getProducts(req.query);
    res.status(200).json({ message: "Products found", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await manager.getProductById(+id);
    if (!product) {
      return product
        .status(404)
        .json({ message: "product not found with the id provided" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});