<script setup lang="ts">
  const favoritesStore = useFavoritesStore();
  const { favorites } = favoritesStore;

  useHead({
    title: 'Marketplace - Favorites',
  });
</script>
<template>
  <div>
    <div class="favorite">
      <section class="section-products">
        <div v-for="product in favorites" :key="product.id" class="product">
          <div class="product__header">
            <img
              :src="product.image"
              alt="product-image"
              class="product__image"
            />
          </div>
          <div class="product__body">
            <div class="product__body--top">
              <p class="product__price">${{ product.price }}</p>
              <p class="product__order">{{ product.orderCount }}</p>
            </div>
            <h3 class="product__title">{{ product.title }}</h3>
          </div>
          <div class="product__footer">
            <SolidFavoriteIcon class="product__action" />
            <CartIcon class="product__action" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
