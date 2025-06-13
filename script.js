document.addEventListener('DOMContentLoaded', () => {
  const cartItems = [];
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const clearCartButton = document.getElementById('clear-cart');
  const checkoutButton = document.getElementById('checkout');
  const paymentForm = document.getElementById('payment-form');
  const submitPaymentButton = document.getElementById('submit-payment');
  const cancelPaymentButton = document.getElementById('cancel-payment');
  const orderConfirmation = document.getElementById('order-confirmation');
  const backToMenuButton = document.getElementById('back-to-menu');

  // 加入購物車
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.getAttribute('data-item');
      const price = parseInt(button.getAttribute('data-price'));
      if (item && price) {
        cartItems.push({ item, price });
        updateCart();
        console.log(`Added to cart: ${item}, Price: ${price}`);
      } else {
        console.error('Invalid item or price:', item, price);
      }
    });
  });

  // 清空購物車
  clearCartButton.addEventListener('click', () => {
    cartItems.length = 0;
    updateCart();
    hidePaymentForm();
    hideOrderConfirmation();
    console.log('Cart cleared');
  });

  // 結帳
  checkoutButton.addEventListener('click', () => {
    if (cartItems.length > 0) {
      paymentForm.style.display = 'block';
      cartItemsList.style.opacity = '0.5';
      cartTotal.style.opacity = '0.5';
      clearCartButton.disabled = true;
      checkoutButton.disabled = true;
      console.log('Checkout initiated');
    } else {
      alert('購物車是空的，請先添加商品！');
    }
  });

  // 提交支付
  submitPaymentButton.addEventListener('click', () => {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCvv = document.getElementById('card-cvv').value.trim();

    if (cardName && cardNumber && cardExpiry && cardCvv) {
      paymentForm.style.display = 'none';
      orderConfirmation.style.display = 'block';
      cartItems.length = 0;
      updateCart();
      console.log('Payment submitted successfully');
    } else {
      alert('請填寫所有支付資訊！');
    }
  });

  // 取消支付
  cancelPaymentButton.addEventListener('click', () => {
    hidePaymentForm();
    cartItemsList.style.opacity = '1';
    cartTotal.style.opacity = '1';
    clearCartButton.disabled = false;
    checkoutButton.disabled = false;
    console.log('Payment cancelled');
  });

  // 返回菜單
  backToMenuButton.addEventListener('click', () => {
    hideOrderConfirmation();
    cartItemsList.style.opacity = '1';
    cartTotal.style.opacity = '1';
    clearCartButton.disabled = false;
    checkoutButton.disabled = false;
    console.log('Returned to menu');
  });

  // 更新購物車
  function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cartItems.forEach((cartItem, index) => {
      const li = document.createElement('li');
      li.textContent = `${cartItem.item} - NT$${cartItem.price}`;
      const removeButton = document.createElement('button');
      removeButton.textContent = '移除';
      removeButton.style.backgroundColor = '#ff4444';
      removeButton.style.color = 'white';
      removeButton.style.border = 'none';
      removeButton.style.padding = '0.3rem 0.6rem';
      removeButton.style.borderRadius = '5px';
      removeButton.style.cursor = 'pointer';
      removeButton.addEventListener('click', () => {
        cartItems.splice(index, 1);
        updateCart();
        console.log(`Removed item: ${cartItem.item}`);
      });
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);
      total += cartItem.price;
    });

    cartTotal.textContent = `總計: NT$${total}`;
    checkoutButton.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
    clearCartButton.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
  }

  // 隱藏支付表單
  function hidePaymentForm() {
    paymentForm.style.display = 'none';
  }

  // 隱藏訂單確認
  function hideOrderConfirmation() {
    orderConfirmation.style.display = 'none';
  }
});