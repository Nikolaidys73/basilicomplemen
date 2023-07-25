import Cart from './cartModel.js';

export const createCart = async (cartData) => {
  const newCart = new Cart(cartData);
  return newCart.save();
};

export const getCartById = async (cartId) => {
  return Cart.findById(cartId);
};

export const getProductsByCartId = async (cartId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new Error('Carrito no encontrado');
  }
  return cart.products;
};

export const addProductToCart = async (cartId, productData) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  const existingProduct = cart.products.find((item) => item.product === productData.product);
  if (existingProduct) {
    existingProduct.quantity += productData.quantity;
  } else {
    cart.products.push(productData);
  }

  return cart.save();
};

export const deleteCart = async (cartId) => {
  return Cart.findByIdAndDelete(cartId);
};
