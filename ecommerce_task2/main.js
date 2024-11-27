document.addEventListener('DOMContentLoaded', () => {
  const languageToggle = document.getElementById('language-toggle');
  const cartButton = document.getElementById('cart-button');
  const cartDropdown = document.getElementById('cart-dropdown');
  const checkoutButton = document.getElementById('checkout-button');
  const cartCount = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const clearCartButton = document.createElement('button'); // Botón para limpiar carrito
  clearCartButton.textContent = 'Clear Cart';
  clearCartButton.classList.add('clear-cart');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const translations = {
    en: {
      pageTitle: 'Pixel Solutions',
      brandTitle: 'Pixel Solutions',
      searchPlaceholder: 'Search products...',
      menuAll: 'All',
      menuDeals: 'Deals',
      menuList: 'List',
      highlightsTitle: 'New Offers',
      highlight1: 'Top Tech Products',
      highlight2: 'Top Home Products',
      highlight3: 'Holiday Deals',
      highlight4: 'Gifts Under $20',
      productGalleryTitle: 'Our Products',
      addToCart: 'Add to Cart',
      checkoutButton: 'Proceed to Checkout',
      footerText: 'Contact us, we are available nationwide.',
      emptyCart: 'Your cart is empty.',
    },
    es: {
      pageTitle: 'Soluciones Pixel',
      brandTitle: 'Soluciones Pixel',
      searchPlaceholder: 'Buscar productos...',
      menuAll: 'Todo',
      menuDeals: 'Ofertas',
      menuList: 'Lista',
      highlightsTitle: 'Nuevas Ofertas',
      highlight1: 'Productos de Tecnología',
      highlight2: 'Productos para el Hogar',
      highlight3: 'Ofertas Navideñas',
      highlight4: 'Regalos por menos de $20',
      productGalleryTitle: 'Nuestros Productos',
      addToCart: 'Añadir al Carrito',
      checkoutButton: 'Proceder al Pago',
      footerText: 'Contáctanos, estamos disponibles en todo el país.',
      emptyCart: 'Tu carrito está vacío.',
    },
  };

  let currentLanguage = 'en';

  function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach((element) => {
      const key = element.getAttribute('data-translate');
      if (key && translations[currentLanguage][key]) {
        element.textContent = translations[currentLanguage][key];
      }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-translate-placeholder');
      if (key && translations[currentLanguage][key]) {
        element.placeholder = translations[currentLanguage][key];
      }
    });

    languageToggle.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    updateCartDropdown();
  }

  function updateCartDropdown() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = translations[currentLanguage].emptyCart;
      cartItemsList.appendChild(emptyMessage);
    } else {
      cartItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
      });

      const totalElement = document.createElement('li');
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
      totalElement.classList.add('cart-total');
      cartItemsList.appendChild(totalElement);

      cartItemsList.appendChild(clearCartButton);
    }

    cartCount.textContent = cartItems.length;
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
      
      // Crear el objeto del producto
      const product = {
        name: productName,
        price: productPrice,
      };
      
      // Agregar el producto al carrito y actualizar localStorage
      cartItems.push(product);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      
      updateCartDropdown();
    });
  });

  cartButton.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
  });

  clearCartButton.addEventListener('click', () => {
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartDropdown();
  });

  checkoutButton.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert(translations[currentLanguage].emptyCart);
    } else {
      window.location.href = '/ecommerce_task2/pages/payment.html';
    }
  });

  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateLanguage();
  });

  updateLanguage();
  updateCartDropdown();
});

