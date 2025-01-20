import Image from "next/image";
import ProductCard from "../../components/ProductCard";
import prisma from "./lib/db";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[1].imageUrl}
            alt={products[1].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold">{products[1].name}</h1>
            <p className="py-6">{products[1].description}</p>
            <Link
              href={"/products/" + products[1].id}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Check It Out
            </Link>
          </div>
        </div>{" "}
      </div>
      <div className="my-4 grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
