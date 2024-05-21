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
  <h1>Home page</h1>
  <section class="section-products">
    <div v-for="product in products" :key="product.id" class="product">
      <div class="product__header">
        <img :src="product.image" alt="" class="product__image" />
      </div>
      <div class="product__body">
        <p class="product__price">{{ product.price }}</p>
        <h3 class="product__title">{{ product.title }}</h3>
      </div>
      <div class="product__footer">
        <FavoriteIcon />
        <CartIcon />
      </div>
    </div>
  </section>
</template>
