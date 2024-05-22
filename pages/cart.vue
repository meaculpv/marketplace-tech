<script setup lang="ts"></script>
<template>
  <div class="bucket">
    <h2 class="heading-secondary u-center-text">Cart</h2>
    <section class="section-cart">
      <div class="cart__item">
        <div class="cart__info">
          <img
            src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
            alt="product-image"
            class="cart__image"
          />
          <h3 class="product__title">Product title</h3>
        </div>
        <div class="cart__col--1">
          <p class="heading-fourth">Product price</p>
          <p class="cart__price">800</p>
        </div>
        <div class="cart__col--2">
          <p class="heading-fourth">Quantity</p>
          <input type="number" class="cart__quantity" />
        </div>
        <div class="cart__col--3">
          <p class="heading-fourth">Full price</p>
          <p class="cart__price">8000</p>
        </div>
        <div class="cart__col--4">
          <button class="cart__action">Delete</button>
        </div>
      </div>
    </section>
  </div>
</template>
