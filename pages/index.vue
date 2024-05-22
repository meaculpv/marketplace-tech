<script setup lang="ts">
  // const { products, setCategory, setFilter, fetchProducts, sortedProducts } =
  //   useProductsStore();
  const productsStore = useProductsStore();
  const { sortedProducts, selectedCategory, selectedFilter } =
    storeToRefs(productsStore);
  const searchInput = ref<string | null>('');

  watch([selectedCategory, selectedFilter], () => {
    productsStore.updateQueryParams();
  });

  await callOnce(async () => {
    await productsStore.fetchProducts();
  });
</script>
<template>
  <div class="home">
    <aside class="filters">
      <form class="search">
        <input class="search__input" type="search" v-model="searchInput" />
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
          <FavoriteIcon class="product__action" />
          <CartIcon class="product__action" />
        </div>
      </div>
    </section>
  </div>
</template>
