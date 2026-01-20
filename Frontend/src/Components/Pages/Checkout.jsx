import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [selectPayment, setSelectPayment] = useState("bank");
  const [discount] = useState(100);
  const navigate = useNavigate();

  // ✅ Billing state
  const [billing, setBilling] = useState({
  firstName: "",
  lastName: "",
  company: "",
  country: "",
  streetAddress: "",   
  city: "",
  postcode: "",        
  state: "",
  email: "",
  phone: ""
});

  // ✅ Handle Billing Form Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCart(updatedCart);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);
  const shipping = cart.length ? 300 : 0;
  const total = subtotal + shipping - discount;

  // ✅ Handle Place Order (Save to DB + LocalStorage)
  const handlePlaceOrder = async () => {
    try {
      // Save locally if needed
      localStorage.setItem("paymentOption", selectPayment);
      localStorage.setItem("billingDetails", JSON.stringify(billing));
      localStorage.setItem("orderCart", JSON.stringify(cart));

      // ✅ Send billing details to backend
      const response = await fetch("http://localhost:5000/api/billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(billing)
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Billing details saved successfully!");
        navigate("/order-summary");
      } else {
        alert("❌ Error: " + (data.message || "Failed to save billing"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error. Please try again later.");
    }
  };

  const PaymentOption = ({ id, label, children }) => (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer transition-all ${
        selectPayment === id
          ? 'border-yellow-500 bg-yellow-50 shadow-sm'
          : 'border-gray-300'
      }`}
    >
      <input
        type="radio"
        id={id}
        name="payment"
        value={id}
        checked={selectPayment === id}
        onChange={() => setSelectPayment(id)}
        className="mt-1 w-4 h-4 text-yellow-400 accent-yellow-400"
      />
      <div>
        <span className="text-sm font-medium">{label}</span>
        {children && <div className="text-xs text-gray-600 mt-1">{children}</div>}
      </div>
    </label>
  );

  return (
    <div className='min-h-screen px-[8%] lg:px-[12%] py-14 bg-white text-gray-800'>
      <h1 className='text-5xl font-bricolage font-semibold text-center mb-10'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Billing Section */}
        <div className='lg:col-span-2 bg-white p-8 border rounded-xl shadow-sm'>
          <h2 className='text-xl font-semibold mb-6'>Billing Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className='block text-sm font-medium mb-1'>First Name *</label>
              <input type="text" name="firstName" value={billing.firstName} onChange={handleChange}
                placeholder='Enter your First Name' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Last Name *</label>
              <input type="text" name="lastName" value={billing.lastName} onChange={handleChange}
                placeholder='Enter your Last Name' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Company (Optional)</label>
              <input type="text" name="company" value={billing.company} onChange={handleChange}
                placeholder='Company Name' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div className="md:col-span-2">
              <label className='block text-sm font-medium mb-1'>Country *</label>
              <select name="country" value={billing.country} onChange={handleChange}
                className="w-full border rounded-md px-4 py-2">
                <option value="">Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>Russia</option>
                <option>England</option>
                <option>France</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Street Address *</label>
              <input type="text" name="streetAddress" value={billing.streetAddress} onChange={handleChange}
                placeholder='Address please' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>City *</label>
              <input type="text" name="city" value={billing.city} onChange={handleChange}
                placeholder='Enter your City' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>PostCode/Zip *</label>
              <input type="text" name="postcode" value={billing.postcode} onChange={handleChange}
                placeholder='754106' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div className="md:col-span-2">
              <label className='block text-sm font-medium mb-1'>State *</label>
              <select name="state" value={billing.state} onChange={handleChange}
                className="w-full border rounded-md px-4 py-2">
                <option value="">Select State</option>
                <option>Odisha</option>
                <option>Bihar</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
                <option>Tamil Nadu</option>
                <option>West Bengal</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Email Address *</label>
              <input type="email" name="email" value={billing.email} onChange={handleChange}
                placeholder='Enter your E-mail' className='w-full border rounded-md px-4 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Phone *</label>
              <input type="text" name="phone" value={billing.phone} onChange={handleChange}
                placeholder='Enter your Phone Number' className='w-full border rounded-md px-4 py-2' />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 rounded-xl border h-fit shadow-sm">
          <h2 className='text-xl font-semibold mb-6'>Your Order</h2>
          <div className='space-y-3 text-sm'>
            {cart.map((item, i) => (
              <div key={i} className='flex justify-between'>
                <span>{item.Name} × {item.quantity}</span>
                <span>₹{(item.Price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className='my-2'/>
            <div className='flex justify-between text-gray-500'>
              <span>SubTotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-gray-500'>
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-gray-500'>
              <span>Discount</span>
              <span className='text-green-600'>-₹{discount.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-gray-500'>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-6 space-y-3">
            <PaymentOption id="bank" label="Direct Bank Transfer">Make your payment directly into our bank account.</PaymentOption>
            <PaymentOption id="check" label="Check Payment">Mail us a check and we’ll ship once it clears.</PaymentOption>
            <PaymentOption id="code" label="Cash On Delivery">Pay with cash when delivered.</PaymentOption>
            <PaymentOption id="paypal" label="PayPal">Redirect to PayPal to complete purchase.</PaymentOption>
            <PaymentOption id="gpay" label="Google Pay">Use Google Pay for secure UPI payments.</PaymentOption>
            <PaymentOption id="paytm" label="Paytm">Pay via Paytm wallet, UPI, or card.</PaymentOption>
            <PaymentOption id="pay" label="PhonePe">Fast and secure payments via PhonePe.</PaymentOption>
          </div>

          {/* Terms */}
          <div className='mt-6 text-sm'>
            <label className='flex items-center gap-2'>
              <input type="checkbox" className='accent-yellow-400' required />
              I Agree To The <span className='text-blue-600'>Terms & Conditions</span>
            </label>
          </div>

          {/* ✅ Button Redirect */}
          <button
            onClick={handlePlaceOrder}
            className='mt-6 w-full bg-yellow-400 text-white py-3 rounded-md hover:bg-yellow-500 transition-all font-semibold'
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
