import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/app/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/app/lib/cart";
import ShoppingCartButton from "./ShoppingCartButton";
// import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/auth/[...nextauth]/route";

export async function searchProduct(formdata: FormData) {
  "use server";
  const searchQuery = formdata.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

const Navbar = async () => {
  const session = await getServerSession(authOption);
  console.log("session", session?.user?.email);
  const cart = await getCart();
  return (
    <div className="bg-base-100 shadow-md">
      <div className="navbar max-w-7xl m-auto flex-col md:flex-row items-center gap-4 md:gap-2 p-2">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl normal-case flex items-center"
          >
            <Image
              src={logo}
              width={40}
              height={40}
              alt="cartique"
              className="mr-2"
            />
            Cartique
          </Link>
        </div>
        <div className="flex-none gap-4 flex items-center">
          <form action={searchProduct} className="form-control">
            <input
              type="text"
              name="searchQuery"
              placeholder="Search"
              className="input input-bordered w-full min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>
          <ShoppingCartButton cart={cart} />

          <div>
            <Link className="py-2 px-4 bg-fuchsia-500" href={"/login"}>
              Login
            </Link>
          </div>

          {/* <UserMenuButton session={session} /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
