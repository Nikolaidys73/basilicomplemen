import express from 'express';
import { getAllProducts, getProductById, addProduct, updateProductById, deleteProductById } from '../dao/productManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await getProductById(req.params.pid);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await updateProductById(req.params.pid, req.body);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    await deleteProductById(req.params.pid);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
