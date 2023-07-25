import express from 'express';
import { getAllProducts } from '../dao/productManager.js';

const router = express.Router();

router.get('/index', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render('index', { products });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

export default router;
