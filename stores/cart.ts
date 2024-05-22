import type { CartItem } from '~/shared/types/Cart';

export const useCartStore = defineStore('cart', () => {
  const items = reactive<CartItem[]>([]);

  const total = computed(() => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });

  const detailedItems = computed(() => {
    const { products } = useProductsStore();

    return items.map((item) => {
      const product = products?.find((product) => product.id === item.id);

      return {
        ...product,
        title: product?.title,
        image: product?.image,
        price: product?.price,
        quantity: item.quantity,
      };
    });
  });

  const totalPrice = computed(() => {
    return detailedItems.value.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  });

  function addToCart(item: CartItem) {
    const index = items.findIndex((i) => i.id === item.id);

    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
  }

  function update({ id, quantity }: CartItem) {
    const index = items.findIndex((item) => item.id === id);
    if (index > -1) {
      items[index].quantity = quantity;
    }
  }

  return {
    items,
    total,
    totalPrice,
    detailedItems,
    addToCart,
    update,
  };
});
