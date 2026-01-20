import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is Gift_Mart?",
    answer:
      "Gift_Mart is our e-commerce platform where you can explore, wishlist, and buy amazing products with ease."
  },
  {
    id: 2,
    question: "How can I add products to the cart?",
    answer:
      "Simply click the cart button on any product. The item will be added to your cart and saved in localStorage."
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Currently, we provide shipping across India. International shipping will be introduced soon."
  },
  {
    id: 4,
    question: "Can I return a product?",
    answer:
      "Yes, you can return a product within 7 days of delivery if it meets our return policy."
  },
  {
    id: 5,
    question: "How can I contact support?",
    answer:
      "You can reach us anytime through the Contact page or email us at support@giftmart.com."
  },
  {
    id: 6,
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, Debit/Credit Cards, Net Banking, and popular wallets. Cash on Delivery is also available for selected areas."
  },
  {
    id: 7,
    question: "Is my personal data safe?",
    answer:
      "Absolutely. We use secure encryption and never share your personal information with third parties."
  },
  {
    id: 8,
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3-7 business days depending on your location. Remote areas may take slightly longer."
  },
  {
    id: 9,
    question: "Can I track my order?",
    answer:
      "Yes, after placing an order you will receive a tracking link via email and SMS to check the status."
  },
  {
    id: 10,
    question: "Do you provide discounts or coupon codes?",
    answer:
      "Yes, we regularly provide seasonal offers and discount codes. Subscribe to our newsletter to stay updated."
  }
];

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="px-[8%] lg:px-[12%] py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-bricolage">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-gray-500">
          Find answers to the most common questions about shopping with Gift_Mart.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:text-yellow-600"
              onClick={() => toggleFaq(faq.id)}
            >
              {faq.question}
              <span className="ml-2 text-xl">
                {openId === faq.id ? "−" : "+"}
              </span>
            </button>
            {openId === faq.id && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
