import { Router } from "express";
import { productsManager } from "../ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts(req.query);
    if(!products.length)
    {return res.status(200).json({message:'No products'})}
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    
    const product = await productsManager.getProductById(+id);
    if (!product) {
      return res.status(404).json({ message: "product not found with the id provided" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async(req,res)=>{
  const {title,description,code,price,stock} = req.body;
  if(!title || !description || !code || !price || !stock)
  {
    res.status(400).json({message: 'Required data missing'})
  }
  try
  {
    const  newProduct = await prodctsManager.createProduct(req.body)
    res.status(200).json({message:"Product created", newProduct})
  }
  catch(error)
  {res.status(500).json({message: error.message})}
})

router.delete('/:idProduct', async(req,res)=>{
  const { id } = req.params;
  try {
    
    const product = await productsManager.getProductById(+id);
    if (!product) {
      return res.status(404).json({ message: "product not found with the id provided" });
    }
    await prodcutsManager.deleteProduct(+id);
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
export default router;