import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  products: [{ product: String, quantity: Number }],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
