import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/app/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/app/lib/cart";
import ShoppingCartButton from "./ShoppingCartButton";

export async function searchProduct(formdata: FormData) {
  "use server";

  const searchQuery = formdata.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}
const Navbar = async () => {
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className=" btn text-xl normal-case">
            <Image src={logo} width={40} height={40} alt="cartique" />
            Cartique
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[200px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
