import type { iProduct } from '~/shared/types/Product';

export const useProductsStore = defineStore('products', () => {
  const products = ref<iProduct[] | null>(null);

  async function fetchProducts() {
    try {
      const response: iProduct[] = await $fetch(
        'http://localhost:8000/products'
      );
      products.value = response;
      console.log(products.value);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    products,
    fetchProducts,
  };
});
