import type { iProduct } from '~/shared/types/Product';

export const useProductsStore = defineStore('products', () => {
  const route = useRoute();
  const router = useRouter();

  const products = ref<iProduct[] | null>(null);
  const selectedCategory = ref<string | null>(null);
  const selectedFilter = ref<string>('All');
  const searchQuery = ref<string>((route.query.search as string) || '');

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

    if (searchQuery.value) {
      sorted = sorted.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
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
      query: {
        category: selectedCategory.value,
        filter: selectedFilter.value,
        search: searchQuery.value,
      },
    });
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    selectedFilter,
    sortedProducts,
    setCategory,
    setFilter,
    fetchProducts,
    updateQueryParams,
  };
});
