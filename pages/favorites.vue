<script setup lang="ts">
  const favoritesStore = useFavoritesStore();
  const { favorites } = storeToRefs(favoritesStore);

  const cartStore = useCartStore();

  useHead({
    title: 'Marketplace - Favorites',
  });
</script>
<template>
  <div>
    <div class="favorite u-marginTop-sm" v-if="favorites?.length > 0">
      <h2 class="heading-secondary u-center-text u-marginBottom-sm">
        Favorites
      </h2>
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
            <SolidFavoriteIcon
              class="product__action"
              @click="favoritesStore.removeFav(product)"
            />
            <CartIcon
              class="product__action"
              @click="cartStore.addToCart({ id: product.id, quantity: 1 })"
            />
          </div>
        </div>
      </section>
    </div>

    <div class="favorite u-marginTop-sm" v-else>
      <h2 class="heading-secondary u-center-text">
        There is no favorites. Go to <NuxtLink to="/">Products page</NuxtLink>
      </h2>
    </div>
  </div>
</template>
