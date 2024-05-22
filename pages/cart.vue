<script setup lang="ts">
  const cartStore = useCartStore();
  const { items, detailedItems, totalPrice } = storeToRefs(cartStore);
</script>
<template>
  <div class="bucket" v-if="items.length > 0">
    <h2 class="heading-secondary u-center-text">Cart</h2>
    <section class="section-cart">
      <div v-for="item in detailedItems" :key="item.id" class="cart__item">
        <div class="cart__info">
          <img :src="item.image" alt="product-image" class="cart__image" />
          <h3 class="cart__title">{{ item.title }}</h3>
        </div>
        <div class="cart__col--1">
          <p class="heading-fourth">Product price</p>
          <p class="cart__price">${{ item.price }}</p>
        </div>
        <div class="cart__col--2">
          <p class="heading-fourth">Quantity</p>
          <input
            @change="cartStore.update({ id: item.id, quantity: item.quantity })"
            type="number"
            class="cart__quantity"
            v-model="item.quantity"
          />
        </div>
        <div class="cart__col--3">
          <p class="heading-fourth">Full price</p>
          <p class="cart__price">${{ item.price * item.quantity }}</p>
        </div>
        <div class="cart__col--4">
          <button class="cart__delete">Delete</button>
        </div>
      </div>
      <div class="cart__action">
        <p>Summary price: ${{ totalPrice }}</p>
        <button class="cart__pay">Pay</button>
      </div>
    </section>
  </div>
  <div class="bucket" v-else>
    <h2 class="heading-secondary u-center-text">Cart</h2>
    <h2 class="heading-secondary u-center-text">
      There is no product in cart.
    </h2>
  </div>
</template>
