"use client";

import { CartWithProducts } from "@/app/lib/cart";
import { formatPrice } from "@/app/lib/format";
import Image from "next/image";
import Link from "next/link";

interface CartEntryPage {
  cartItem: CartWithProducts;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryPage) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>price: {formatPrice(product.price)}</div>
        </div>
      </div>
    </div>
  );
}
