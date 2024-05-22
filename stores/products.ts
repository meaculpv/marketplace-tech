import type { iProduct } from '~/shared/types/Product';

export const useProductsStore = defineStore('products', () => {
  const router = useRouter();

  const products = ref<iProduct[] | null>(null);
  const selectedCategory = ref<string | null>(null);
  const selectedFilter = ref<string>('All');

  const sortedProducts = computed(() => {
    if (!products.value) return [];

    let sorted = [...products.value];

    switch (selectedFilter.value) {
      case 'Cheap First':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'By order amount':
        sorted.sort((a, b) => b.orderCount - a.orderCount);
        break;
      default:
        break;
    }

    if (selectedCategory.value && selectedCategory.value !== 'All') {
      sorted = sorted.filter(
        (product) => product.category === selectedCategory.value
      );
    }

    return sorted;
  });

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

  function setCategory(category: string) {
    selectedCategory.value = category;
  }

  function setFilter(filter: string) {
    selectedFilter.value = filter;
  }

  function updateQueryParams() {
    router.push({
      query: { category: selectedCategory.value, filter: selectedFilter.value },
    });
  }

  return {
    products,
    selectedCategory,
    selectedFilter,
    sortedProducts,
    setCategory,
    setFilter,
    fetchProducts,
    updateQueryParams,
  };
});
