// main.js

// Función para cargar los productos en la página index.handlebars
async function loadProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
  
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
  
    products.forEach((product) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.title} - $${product.price}`;
      productsList.appendChild(listItem);
    });
  }
  
  // Función para enviar el formulario y agregar un producto al carrito
  async function addProductToCart() {
    const form = document.getElementById('add-to-cart-form');
    const formData = new FormData(form);
  
    const response = await fetch('/api/carts', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      alert('Producto agregado al carrito');
    } else {
      alert('Error al agregar el producto al carrito');
    }
  }
  
  // Cargar los productos al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
  });
  
  // Event listener para el formulario de agregar producto al carrito
  document.getElementById('add-to-cart-form').addEventListener('submit', (event) => {
    event.preventDefault();
    addProductToCart();
  });
  