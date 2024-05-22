import type { CartItem } from '~/shared/types/Cart';

export const useCartStore = defineStore('cart', () => {
  const items = reactive<CartItem[]>([]);
  const paidItems = ref<CartItem[]>([]);

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

  function pay() {
    const productsStore = useProductsStore();
    const { products } = storeToRefs(productsStore);

    items.forEach((cartItem) => {
      const product = products.value?.find(
        (product) => product.id === cartItem.id
      );
      if (product) {
        product.orderCount += cartItem.quantity;
      }
    });

    paidItems.value.push(...items);
    items.splice(0, items.length);
  }

  function remove(itemId: number) {
    const index = items.findIndex((item) => item.id === itemId);
    if (index > -1) {
      items.splice(index, 1);
    }
  }

  return {
    items,
    paidItems,
    total,
    totalPrice,
    detailedItems,
    addToCart,
    update,
    pay,
    remove,
  };
});
