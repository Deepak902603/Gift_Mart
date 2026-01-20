import React from 'react';
import { Link } from 'react-router-dom';
import ProductData from "../../Data.json";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Shop = () => {
     const products = ProductData.Products;
       const navigate = useNavigate();
       const handleAddToCart = (product) => {
         const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
         const exists = cart.some((item) => item.id === product.id);
     
         if (!exists) {
           const updatedCart = [...cart, { ...product, quantity: 1 }];
           localStorage.setItem("cartItems", JSON.stringify(updatedCart));
           toast.success(`✅ ${product.Name}added to cart.`);
         } else {
           toast.error(`❌ ${product.Name} is already in the cart.`);
         }
         setTimeout(() => {
           navigate("/cart");
         }, 1000);
       };
    return (
        <>
         <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
            <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                <Link to='/'className="hover:underline text-gray-700 font-medium">
                Home
                </Link>
                <span className="text-gray-500">&nbsp; / &nbsp;</span>
                <span className="text-yellow-700 font-semibold">Shop</span>
            </div>
        </div>

           {/* Products */}

           <div className='product-wrapper px-4 px-[8%] lg:py-[12%] py-10 grid grid-cols-1 lg:grid-cols-4 gap-6'>
             {products.slice(0, 40).map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-sm rounded-xl p-4 flex flex-col items-start hover:shadow-xl transition duration-300 group border border-gray-100 cursor-pointer:"
              >
                <p className="text-xl text-white font-bold mb-1 bg-red-600 px-3 py-2 rounded">
                  {product.Category}
                </p>
                <img
                  src={product.ProductsImage}
                  alt={product.Name}
                  className="w-4/5 h-32 object-contain group-hover:scale-105 transition duration-300"
                  onClick={() => navigate(`/product/${product.id}`)}
                />

                <h4
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="text-lg font-medium mt-3 text-yellow-800 hover:underline line-clamp-2"
                >
                  {product.Name}
                </h4>
                <div className="flex mt-5 flex-row items-center justify-center justify-between w-full">
                  {product.oldPrice ? (
                    <div className="mt-1 text-md">
                      <span className="line-through text-gray-400">
                        ₹{product.oldPrice}
                      </span>{" "}
                      <span className="text-red-600 font-bold">
                        ₹{product.Price}
                      </span>
                    </div>
                  ) : (
                    <div className="text-lg font-semibold mt-1 ">
                      ₹{product.Price}
                    </div>
                  )}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-400 text-white rounded-full w-[45px] h-[45px] hover:bg-red-500 hover:shadow-xl transition"
                  >
                    <i className="bi bi-cart"></i>
                  </button>
                </div>
              </div>
            ))}

           </div>
        </>
    );
}

export default Shop;
