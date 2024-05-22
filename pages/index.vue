<script setup lang="ts">
  const productsStore = useProductsStore();
  const { sortedProducts, selectedCategory, selectedFilter, searchQuery } =
    storeToRefs(productsStore);

  const favoritesStore = useFavoritesStore();
  const { favorites } = storeToRefs(favoritesStore);
  watch([selectedCategory, selectedFilter, searchQuery], () => {
    productsStore.updateQueryParams();
  });

  useHead({
    title: 'Marketplace - Products',
  });

  await callOnce(async () => {
    await productsStore.fetchProducts();
  });
</script>
<template>
  <div class="home">
    <aside class="filters">
      <form class="search">
        <input class="search__input" type="search" v-model="searchQuery" />
        <SearchIcon class="search__button" />
      </form>
      <div class="category">
        <h3 class="heading-tertiary u-marginBottom-sm">Categories</h3>
        <ul class="category__list">
          <li class="category__item" @click="productsStore.setCategory('All')">
            All
          </li>
          <li
            class="category__item"
            @click="productsStore.setCategory(`men's clothing`)"
          >
            Men's clothing
          </li>
          <li
            class="category__item"
            @click="productsStore.setCategory(`women's clothing`)"
          >
            Women's clothing
          </li>
          <li
            class="category__item"
            @click="productsStore.setCategory('jewelery')"
          >
            Jewelery
          </li>
          <li
            class="category__item"
            @click="productsStore.setCategory('electronics')"
          >
            Electronics
          </li>
        </ul>
      </div>
      <div class="category">
        <h3 class="heading-tertiary u-marginBottom-sm">Filters</h3>
        <ul class="category__list">
          <li class="category__item" @click="productsStore.setFilter('All')">
            All
          </li>
          <li
            class="category__item"
            @click="productsStore.setFilter('Cheap First')"
          >
            Cheap First
          </li>
          <li
            class="category__item"
            @click="productsStore.setFilter('By order amount')"
          >
            By order amount
          </li>
        </ul>
      </div>
    </aside>
    <section class="section-products">
      <div v-for="product in sortedProducts" :key="product.id" class="product">
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
          <FavoriteIcon
            class="product__action"
            @click="favoritesStore.addToFav(product)"
            v-if="favorites?.findIndex((fav) => fav.id === product.id) === -1"
          />
          <SolidFavoriteIcon
            class="product__action"
            @click="favoritesStore.removeFav(product)"
            v-else
          />
          <CartIcon class="product__action" />
        </div>
      </div>
    </section>
  </div>
</template>
