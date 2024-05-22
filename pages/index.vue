<script setup lang="ts">
  const { products, fetchProducts } = useProductsStore();

  // onBeforeMount(async () => {
  //   await productsStore.fetchProducts();
  // });
  await callOnce(async () => {
    await fetchProducts();
  });
</script>
<template>
  <div class="home">
    <aside class="filters">
      <div class="category">
        <ul class="category__list">
          <li class="category__item">Men's clothing</li>
          <li class="category__item">Women's clothing</li>
          <li class="category__item">Jewelery</li>
          <li class="category__item">Electronics</li>
        </ul>
      </div>
    </aside>
    <section class="section-products">
      <div v-for="product in products" :key="product.id" class="product">
        <div class="product__header">
          <img :src="product.image" alt="" class="product__image" />
        </div>
        <div class="product__body">
          <p class="product__price">${{ product.price }}</p>
          <h3 class="product__title">{{ product.title }}</h3>
        </div>
        <div class="product__footer">
          <FavoriteIcon class="product__action" />
          <CartIcon class="product__action" />
        </div>
      </div>
    </section>
  </div>
</template>
