<script setup lang="ts">
  const cartStore = useCartStore();
  const { total } = storeToRefs(cartStore);
</script>
<template>
  <header class="header">
    <nav class="navigation__nav">
      <ul class="navigation__list">
        <li class="navigation__item">
          <NuxtLink to="/" class="navigation__link">Products</NuxtLink>
        </li>
        <li class="navigation__item">
          <NuxtLink to="/favorites" class="navigation__link"
            >Favorites</NuxtLink
          >
        </li>
        <li class="navigation__item">
          <NuxtLink to="/cart" class="navigation__link"
            >Cart: {{ total }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
