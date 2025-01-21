import CartEntry from "../../../components/CartEntry";
import { getCart } from "../lib/cart";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">ShoppingCart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry cartItem={cartItem} key={cartItem.cartId} />
      ))}
    </div>
  );
}
