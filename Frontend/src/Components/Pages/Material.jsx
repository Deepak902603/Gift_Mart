import React from "react";
import { useLocation, Link } from "react-router-dom";

// Sample products (replace with your own data)
const products = [
  { id: 1, name: "JBL Speaker", category: "Speakers", price: 199 },
  { id: 2, name: "Dell Laptop", category: "Laptops", price: 999 },
  { id: 3, name: "Sony TV", category: "Televisions", price: 499 },
  { id: 4, name: "Samsung Phone", category: "Phones", price: 799 },
  { id: 5, name: "Canon Camera", category: "Cameras", price: 699 },
  { id: 6, name: "LG Refrigerator", category: "Refrigerators", price: 899 },
];

function Material() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); // 👈 read category from URL

  // Filter products by category
  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="px-10 py-6">
      <h2 className="text-3xl font-bold mb-6">
        {category ? `Shop - ${category}` : "Shop All Products"}
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="font-bold">${product.price}</p>
              {/* 👇 Link to ProductDetails page */}
              <Link
                to={`/product/${product.id}`}
                className="mt-3 inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}

export default Material;
