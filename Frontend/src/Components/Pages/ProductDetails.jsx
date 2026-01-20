import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import ProductData from "../../Data.json";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import brand1 from "../../assets/dell.png";
import brand2 from "../../assets/samsung.png";
import brand3 from "../../assets/sanyo.png";
import brand4 from "../../assets/lenovo.png";
import brand5 from "../../assets/oppo.png";
import brand6 from "../../assets/panasonic.png";
import brand7 from "../../assets/asus.png";
// import bannerCard1 from "../../assets/banner-card-3.jpg";

function ProductDetails() {
  const { id } = useParams();
  const products = ProductData.Products;
  const navigate = useNavigate();
  const product = products.find((item) => item.id === parseInt(id));
  if (!product)
    return (
      <div className="p-10 text-center text-xl alert alert-danger">
        Product Not Found
      </div>
    );

  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  }, [product?.id]);

  const handleWishlistIcon = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.id === product.id);

    let updatedList;
    if (exists) {
      updatedList = wishlist.filter((item) => item.id !== product.id);
      toast.info("Item removed from Wishlist");
    } else {
      updatedList = [...wishlist, product];
      toast.success("Item added to wishlist");
    }

    localStorage.setItem("wishlistItems", JSON.stringify(updatedList));
    setIsWishlisted(!exists);
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.id === product.id);
    if (!exists) {
      const updatedList = [...wishlist, product];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedList));
    }
    toast.success("Item added to wishlist");

    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const exists = cart.some((item) => item.id === product.id);

    if (!exists) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      toast.success(`✅ ${product.Name} added to cart.`);
    } else {
      toast.error(`❌ ${product.Name} is already in the cart.`);
    }

    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-xl text-red-600">
        Product Not Found
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      {/* Page Header Section */}
      <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">
            Home
          </Link>
          <span className="text-gray-500">&nbsp;/&nbsp;</span>
          <span className="text-red-900 font-semibold">Product Details</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row item-center gap-10 px-[8%] lg:px-[12%] py-20">
        <div className="w-full md:w-1/2 flex gap-6 justify-between px-[80px] py-[50px] border rounded-xl shadow-md relative">
          {/* Main Image */}
          <div
            className="relative w-[250px] h-[250px] overflow-hidden rounded-xl shadow-md border cursor-pointer"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.ProductsImage}
              alt={product.Name}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Zoomed Img Show */}
          {zoom && (
            <div className="w-[700px] h-[450px] border overflow-hidden rounded-xl shadow-md  relative z-20">
              <img
                src={product.ProductsImage}
                alt="zoom"
                className="absolute w-[500px] h-[500px] object-cover
                 pointer-events-none"
                style={{
                  left: `-${mousePosition.x * 2}px`,
                  top: `-${mousePosition.y * 2}px`,
                }}
              />
            </div>
          )}
          {/* Thumbnail Images */}
          <div className="w-full md:w-1/2">
            <p className="text-sm font-semibold bg-red-500 inline-block px-3 py-1 rounded text-white mb-4">
              {product.Category}
            </p>
            <h2 className="text-3xl font-bold font-bricolage text-black mb-3">
              {product.Name}
            </h2>
            <div className="text-2xl font-bold text-red-600 mb-2">
              ₹{product.Price}
              {product.oldPrice && (
                <span className="text-gray-400 text-lg line-through ml-3">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam sapiente nobis nostrum at totam facilis in eum ducimus
              iste minima!
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="mt-4 px-6 py-2 rounded bg-red-500 text-white hover:bg-yellow-500 transition"
              >
                Add To Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="mt-4 px-6 py-2 rounded bg-yellow-500 text-white hover:bg-red-500 transition"
              >
                Add To Wishlist
              </button>
            </div>
            <div className="my-3 bg-red-100 p-3">
              <p className="text-semibold">
                {" "}
                Estimated delivery time 14-30 days
              </p>
              <p className="text-semibold">
                {" "}
                18 Months Warranty at Genuine Warranty Center
              </p>
              <p className="text-semibold">
                Use coupon to get extra ₹50 off(Only this Product)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Policys */}
      <div className="px-[8%] lg:px-[12%]">
        <h2 className="font-bricolage font-bold text-3xl mb-5">
          Shipping Policy
        </h2>
        <p className="mb-3 text-md">
          Welcome to Gift_Mart – Your One-Stop Electronics Destination! At
          Gift_Mart, we bring you the latest and most reliable electronic
          gadgets at unbeatable prices. From smartphones and laptops to home
          appliances and accessories, we’ve got it all. We focus on quality,
          authenticity, and customer satisfaction with every product we sell.
          Enjoy fast delivery, secure shopping, and excellent after-sales
          support. Upgrade your lifestyle with technology that fits your needs —
          only at Gift_Mart!
        </p>
        <p className="mb-3 text-md">
          We strive to provide fast and reliable shipping to our
          customers.Here's everything you neede
        </p>
        <p className="mb-1">Dispatch:Within 24 Hours</p>
        <p className="mb-1">
          Free shipping across all products on a minimum purchase of $800
        </p>
        <p className="mb-1">International delivery time 5 to 7 business days</p>
        <p className="mb-1">Cash on delivery is also Available</p>
        <p className="mb-1">Easy 30 days returns and exchanges</p>
        <p className="mb-1">
          Please note that delivery times are estimates and may vary depending
          on factors such as product Avilability
        </p>
        <h2 className="font-bricolage font-bold text-3xl mb-5 mt-10">
          Returns Policy
        </h2>
        <p>
          Returns You have 7–30 days (choose timeframe) from the date of
          delivery to return an item. To be eligible for a return: The item must
          be unused and in the same condition you received it. It must be in the
          original packaging. Proof of purchase (receipt or order number) is
          required. Non-returnable items include: Perishable goods (food,
          flowers, etc.) Personal care items (underwear, cosmetics, etc.)
          Customized or personalized products Gift cards and downloadable
          software Return Process Contact our support team at
          support@[yourdomain].com with your order number and reason for return.
          We’ll send you a return authorization and instructions. Ship the item
          back to us (return shipping may or may not be covered). Once received
          and inspected, we'll notify you of the approval or rejection of your
          refund. Refunds If approved, your refund will be processed within 5–10
          business days to your original payment method. Shipping charges (if
          any) are non-refundable. If you haven’t received a refund, first check
          your bank account, then contact your credit card company or bank.
          Exchanges We only replace items if they are defective or damaged.
          Contact us within 7 days of receiving the item to request an exchange.
        </p>
      </div>
      {/* Add Review */}
      <div className="px-[8%] lg:px-[10%] py-[50px]">
        <div className="px-[2%] py-[20px] border rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 font-bricolage">Add a Review</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Your Name</label>
              <input 
              type="text" 
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

            </div>
             <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Rating</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              defaultValue=""
              >
                <option value="" disabled>Select Rating</option>
                <option value="5">⭐⭐⭐⭐⭐(5)</option>
                <option value="4">⭐⭐⭐⭐(4)</option>
                <option value="3">⭐⭐⭐(3)</option>
                <option value="2">⭐⭐(2)</option>
                <option value="1">⭐(1)</option>

              </select>

            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Your Review</label>
              <textarea 
                  rows="4"
                  placeholder="Enter you Review"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
             <button
                type="submit"
                className="bg-yellow-400 hover:bg-red-500  text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
             >
              Submit Review
             </button>
          </form>

        </div>
      </div>
      {/* Brands  */}
      <div className="px-[8%] lg:px-[12%] py-10">
        <Swiper
         slidesPerView={2}
         spaceBetween={20}
         loop={true}
         autoplay={{delay:1000,
          disableOnInteraction:false,
         }}
         breakpoints={{
          1399:{ slidesPerView:5},
          1199:{ slidesPerView:5},
          991:{ slidesPerView:4},
          575:{ slidesPerView:3},
          0:{ slidesPerView:3},
         }}
         modules={[Autoplay]}
        >
         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand1} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>
          
          <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand2} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>

         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand3} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>

         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand4} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>

         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand5} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>

         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand6} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>

         <SwiperSlide>
          <div className="flex items-center justify-center h-20">
            <img src={brand7} className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition" />
          </div>
         </SwiperSlide>
 
        </Swiper>

      </div>
    </>
  );
}

export default ProductDetails;
