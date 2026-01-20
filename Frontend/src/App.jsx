import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav.jsx";
import "./index.css";
import Index from "./Components/Pages/Index.jsx";
import ProductDetails from "./Components/Pages/ProductDetails.jsx";
import Wishlist from "./Components/Pages/Wishlist.jsx";
import Cart from "./Components/Pages/Cart.jsx";
import Checkout from "./Components/Pages/Checkout.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import About from "./Components/Pages/About.jsx";
import Shop from "./Components/Pages/Shop.jsx";
import Blog from "./Components/Pages/Blog.jsx";
import Faq from "./Components/Pages/FAQ.jsx";
import Contact from "./Components/Pages/Contact.jsx";
import Login from "./Components/Pages/Login.jsx";
import OrderSummary from "./Components/Pages/OderSummery.jsx";
import Material from "./Components/Pages/Material.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/material" element={<Material />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
