import React, { useEffect, useState } from 'react';

function OrderSummary() {
  const [payment, setPayment] = useState('');
  const [billing, setBilling] = useState({});
  const [cart, setCart] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, discount: 0, total: 0 });

  const toNumber = (v) => (typeof v === 'number' ? v : Number(String(v).replace(/[^\d.-]/g, '')));

  useEffect(() => {
    setPayment(localStorage.getItem('paymentOption') || 'bank');
    setBilling(JSON.parse(localStorage.getItem('billingDetails')) || {});
    const storedCart = JSON.parse(localStorage.getItem('orderCart')) || [];
    setCart(storedCart);

    const savedTotals = JSON.parse(localStorage.getItem('orderTotals') || 'null');
    if (savedTotals) {
      setTotals(savedTotals);
    } else {
      // Fallback: compute exactly like Checkout
      const subtotal = storedCart.reduce(
        (acc, item) => acc + toNumber(item.Price) * (item.quantity || 1),
        0
      );
      const shipping = storedCart.length ? 300 : 0;
      const discount = 100;
      const total = subtotal + shipping - discount;
      setTotals({ subtotal, shipping, discount, total });
    }
  }, []);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = () => {
    if (Object.values(paymentDetails).some((v) => !v)) {
      alert('Please fill all payment details!');
      return;
    }
    setIsPaid(true);
  };

  const renderPaymentForm = () => {
    switch (payment) {
      case 'bank':
        return (
          <div className="space-y-3">
            <input type="text" name="bankName" placeholder="Bank Name" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="text" name="accountHolder" placeholder="Account Holder Name" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="number" name="amount" placeholder="Transaction Amount" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="date" name="date" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
          </div>
        );
      case 'paypal':
        return (
          <div className="space-y-3">
            <input type="email" name="paypalEmail" placeholder="PayPal Email" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="number" name="amount" placeholder="Transaction Amount" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
          </div>
        );
      case 'gpay':
        return (
          <div className="space-y-3">
            <input type="text" name="upiId" placeholder="GPay UPI ID" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="number" name="amount" placeholder="Transaction Amount" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
          </div>
        );
      case 'paytm':
        return (
          <div className="space-y-3">
            <input type="text" name="mobile" placeholder="Paytm Mobile Number" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="number" name="amount" placeholder="Transaction Amount" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
          </div>
        );
      case 'pay':
        return (
          <div className="space-y-3">
            <input type="text" name="upiId" placeholder="PhonePe UPI ID" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
            <input type="number" name="amount" placeholder="Transaction Amount" onChange={handlePaymentChange} className="w-full border px-3 py-2 rounded" />
          </div>
        );
      case 'code':
        return <p className="text-gray-600">You will pay <b>₹{totals.total.toFixed(2)}</b> in cash on delivery.</p>;
      default:
        return <p>No payment method selected.</p>;
    }
  };

  return (
    <div className="min-h-screen px-[8%] lg:px-[12%] py-14 bg-white text-gray-800">
      <h1 className="text-4xl font-bricolage font-semibold text-center mb-10">Order Placed Successfully 🎉</h1>

      {/* Billing Details */}
      <div className="bg-gray-50 p-6 rounded-xl border shadow-sm mb-6">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <p><strong>Name:</strong> {billing.firstName} {billing.lastName}</p>
        <p><strong>Email:</strong> {billing.email}</p>
        <p><strong>Phone:</strong> {billing.phone}</p>
        <p><strong>Address:</strong> {billing.streetAddress}, {billing.city}, {billing.state}, {billing.postcode}, {billing.country}</p>
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-6 rounded-xl border shadow-sm mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between text-sm mb-2">
            <span>{item.Name} × {item.quantity}</span>
            <span>₹{(toNumber(item.Price) * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{totals.subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{totals.shipping.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-600"><span>Discount</span><span>-₹{totals.discount.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold"><span>Total</span><span>₹{totals.total.toFixed(2)}</span></div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Payment Method: <span className="text-yellow-600">{payment}</span></h2>

        {!isPaid ? (
          <>
            {renderPaymentForm()}
            {payment !== 'code' && (
              <button onClick={handlePayment} className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                Make Payment
              </button>
            )}
            {payment === 'code' && <p className="mt-4 text-green-600 font-semibold">Cash on Delivery Confirmed ✔</p>}
          </>
        ) : (
          <p className="text-green-600 font-bold text-lg">✅ Payment Successful!</p>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
