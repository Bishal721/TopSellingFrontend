import React, { useEffect, useState } from "react";
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};
import Card from "../components/card/Card";
import { getProducts } from "../fetch/fetchService";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && products.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="text-2xl text-red-500">Events Not Available</div>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-6 p-4 mx-auto sm:mx-none justify-center">
            {products.map((product) => (
              <Card
                key={product.productId}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
                    <img
                      src={product?.imageUrl}
                      alt="product Image"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {product?.name}
                    </h4>
                    <p className="font-sans text-md font-normal leading-relaxed text-gray-700">
                      {`Category: ${product?.category}`}
                    </p>
                    <p className="font-sans text-md font-normal leading-relaxed text-gray-700">
                      {`Price: $ ${product.price}`}
                    </p>
                    <p className="font-sans text-md font-normal leading-relaxed text-gray-700">
                      {`Units Sold: ${product.unitsSold}`}
                    </p>
                    <p className="mt-2 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
                      {shortenText(product.description, 60)}
                    </p>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <button
                    className="rounded-lg bg-orange-400 p-2 text-white align-middle font-sans text-base transition-all hover:bg-orange-300 w-full"
                    type="button"
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
