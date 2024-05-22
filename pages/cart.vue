<script setup lang="ts">
  const cartStore = useCartStore();
  const { items, detailedItems, detailedPaidItems, totalPrice } =
    storeToRefs(cartStore);

  const deleteButton = ref(null);
  const quantityInput = ref(null);
  const paymentButton = ref(null);

  // function pay() {
  //   cartStore.pay();
  //   quantityInput.value.disabled = true;
  //   deleteButton.value.disabled = true;
  //   paymentButton.value.disabled = true;
  // }
  useHead({
    title: 'Marketplace - Cart',
  });
</script>
<template>
  <div>
    <div class="bucket" v-if="items.length > 0 || detailedPaidItems.length > 0">
      <section class="section-cart" v-show="items.length > 0">
        <TransitionGroup name="cart">
          <h2 class="heading-secondary u-center-text">Cart</h2>
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
                @change="
                  cartStore.update({ id: item.id, quantity: item.quantity })
                "
                type="number"
                class="cart__quantity"
                v-model="item.quantity"
                ref="quantityInput"
              />
            </div>
            <div class="cart__col--3">
              <p class="heading-fourth">Full price</p>
              <p class="cart__price">${{ item.price * item.quantity }}</p>
            </div>
            <div class="cart__col--4">
              <button
                ref="deleteButton"
                class="cart__delete"
                @click="cartStore.remove(item.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div class="cart__action">
            <p>Summary price: ${{ totalPrice }}</p>
            <button
              ref="paymentButton"
              class="cart__pay"
              @click="cartStore.pay"
            >
              Pay
            </button>
          </div>
        </TransitionGroup>
      </section>
      <section class="section-history" v-show="detailedPaidItems.length > 0">
        <TransitionGroup name="cart">
          <h2 class="heading-secondary u-center-text">History</h2>
          <div
            v-for="item in detailedPaidItems"
            :key="item.id"
            class="cart__item"
          >
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
                @change="
                  cartStore.update({ id: item.id, quantity: item.quantity })
                "
                type="number"
                class="cart__quantity"
                v-model="item.quantity"
                ref="quantityInput"
                disabled
              />
            </div>
            <div class="cart__col--3">
              <p class="heading-fourth">Full price</p>
              <p class="cart__price">${{ item.price * item.quantity }}</p>
            </div>
            <div class="cart__col--4">
              <button
                ref="deleteButton"
                class="cart__delete"
                @click="cartStore.remove(item.id)"
                disabled
              >
                Delete
              </button>
            </div>
          </div>
        </TransitionGroup>
      </section>
    </div>
    <div class="bucket" v-else>
      <h2 class="heading-secondary u-center-text">Cart</h2>
      <h2 class="heading-secondary u-center-text">
        There is no product in cart. Go to
        <NuxtLink to="/">Products page</NuxtLink>
      </h2>
    </div>
  </div>
</template>
