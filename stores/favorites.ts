import type { iProduct } from '~/shared/types/Product';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<iProduct[] | null>([]);

  function addToFav(product: iProduct) {
    const favIndex = favorites.value?.findIndex((fav) => fav.id === product.id);
    console.log(favIndex, product.id);

    if (favIndex === -1) {
      favorites.value?.push(product);
    } else {
    }
  }

  function removeFav(product: iProduct) {
    favorites.value?.filter((fav) => fav.id !== product.id);
  }

  return {
    favorites,
    addToFav,
    removeFav,
  };
});
