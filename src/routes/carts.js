import express from 'express';
import { createCart, getCartById, getProductsByCartId, addProductToCart, deleteCart } from '../dao/cartManager.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newCart = await createCart({ id: 'cart_' + Date.now(), products: [] });
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
      res.json(cart);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.get('/:cid/products', async (req, res) => {
  try {
    const products = await getProductsByCartId(req.params.cid);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    await addProductToCart(req.params.cid, { product, quantity });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    await deleteCart(req.params.cid);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});

export default router;
