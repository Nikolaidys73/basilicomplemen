import Product from './productModel.js';

export const getAllProducts = async () => {
  return Product.find({});
};

export const getProductById = async (productId) => {
  return Product.findById(productId);
};

export const addProduct = async (productData) => {
  const newProduct = new Product(productData);
  return newProduct.save();
};

export const updateProductById = async (productId, newData) => {
  return Product.findByIdAndUpdate(productId, newData, { new: true });
};

export const deleteProductById = async (productId) => {
  return Product.findByIdAndDelete(productId);
};
