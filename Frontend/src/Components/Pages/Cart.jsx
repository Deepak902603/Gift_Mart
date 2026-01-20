import { useEffect, useState } from "react";
import { toast, ToastContainer} from 'react-toastify';
import {useNavigate}from 'react-router-dom';
function Cart(){
    const[cart,setCart]=useState([]);
    const[couponCode,setCouponCode]=useState('');
    const[discount,setDiscount]=useState(0);

    useEffect(()=>{
        const storedCart=JSON.parse(localStorage.getItem('cartItems')||[]);
        const fixedCart=storedCart.map(item=>({
            ...item,
            Price:parseFloat(item.Price),
            quantity:item.quantity||1,
        }));
        setCart(fixedCart);
    },[]);

    const updateQuantity=(id,delta)=>{
        const updateCart=cart.map(item=>{
            if(item.id===id){
                const newQty=Math.max(1,item.quantity+delta);
                return{...item,quantity:newQty};
            }
            return item;
        });
        setCart(updateCart);
        localStorage.setItem('cartItems',JSON.stringify(updateCart));
    };

    const removeFromCart=(id)=>{
        const confirmRemove=window.confirm("Are You Sure You Want To Remove this Product Bro!");
        if(!confirmRemove) return;

        const updateCart=cart.filter(item=>item.id !==id);
        setCart(updateCart);
        localStorage.setItem('cartItems',JSON.stringify(updateCart));
        toast.success("Item Removed Form Cart.");
    };

    const handleApplyCoupon=()=>{
        const code=couponCode.trim().toLowerCase();
        if(code==='deepak902'){
            setDiscount(10);
            toast.success("10% discount applied");
        } 
        else{
            setDiscount(0);
            toast.error("Invalid Coupon Code");
        }
    };
    const subtotal=cart.reduce((acc,item)=>acc+item.Price*item.quantity,0);
    const shipping=cart.length?300:0;
    const discountAmount=(subtotal*discount)/100;
    const total=subtotal-discountAmount+shipping;

    const navigate=useNavigate();

    const handlePlaceOrder=()=>{
        navigate('/checkout');
    };
    
    return(
       <>
       <div className="px-4 sm:px-8 lg:px-[12%] py-12 bg-gray-50 text-gray-800 min-h-screen">
        <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-center mb-12 text-yellow-600 font-bricolage">My Shopping Cart</h1>
       <ToastContainer position="top-right"autoClose={1500}/>
        {/* Destopview */}

        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-6">
                <thead>
                    <tr className="text-sm text-gray-500 border-b border-gray-200">
                        <th className="text-lg font-semibold">Remove</th>
                        <th className="text-lg font-semibold text-center">Product</th>
                        <th className="text-center font-semibold">Price</th>
                        <th className="text-center font-semibold">Quantity</th>
                        <th className="text-center font-semibold">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item=>(
                        <tr key={item.id} className="bg-white border rounded-xl shadow-sm">
                            <td className="text-center">
                                <button onClick={()=>removeFromCart(item.id)}className="text-xl text-gray-400 hover:text-red-500" >
                                 <i className="ri-close-line"></i>
                                </button>

                            </td>
                            <td className="flex items-center gap-4 px-2 py-4">
                                <img src={item.ProductsImage} alt={item.Name} className="w-24 h-24 object-contain border p-2 rounded-lg" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{item.Name}</h3>
                                    <p className="text-sm text-gray-500">{item.Category}</p>
                                </div>
                            </td>
                            <td className="text-center text-gray-900 font-medium">₹{item.Price.toFixed(2)}</td>
                            <td className="text-center">
                                <div className="inline-flex items-center border rounded overflow-hidden">
                                    <button onClick={()=>updateQuantity(item.id,-1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200">-</button>
                                    <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                                    <button onClick={()=>updateQuantity(item.id,1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200">+</button>
                                </div>
                            </td>
                            <td className="text-center font-semibold text-gray-800">₹{(item.Price * item.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}

                    {cart.length===0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-500 py-10">
                               <i className="ri-shopping-cart-line text-2xl mr-2"></i> Your cart is empty. Start shopping now!
                            </td>
                        </tr>)}
                </tbody>
            </table>
            </div>
         {/* {Mobile Card view} */}
         <div className="md:hidden space-y-6">
            {cart.map(item=>(
                <div key={item.id} className="bg-white rounded-xl p-4 shadow border space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{item.Name}</h3>
                      <button onClick={()=>removeFromCart(item.id)} className="text-xl text-gray-400 hover:text-red-500"><i className="ri-close-line"></i>
                      </button>  
                    </div>
                    <img src={item.ProductsImage} alt={item.Name} className="w-full h-40 object-contain" />
                    <p className="text-sm text-gray-500">{item.Category}</p>
                    <p className="text-base font-medium text-gray-800">Price: ₹{item.Price.toFixed(2)}</p>
                   <div className=" flex items-center justify-between">
                    <div className="flex items-center border rounded">
                      <button onClick={()=>updateQuantity(item.id,-1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200">-</button>
                                    <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                                    <button onClick={()=>updateQuantity(item.id,1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200">+</button> 

                    </div>
                  <span className="font-semibold text-gray-800">₹{(item.Price*item.quantity)}</span>
                   </div>
                </div>
            ))}
         </div>
         {/* Coupon section */}
        <div className=" mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2 flex">   
               <input 
               type="text"
               placeholder="Coupon code(e.g-Debashis1002)"
               value={couponCode}
               onChange={(e)=>setCouponCode(e.target.value)}
               className="border px-4 w-full rounded-l-md outline-none text-gray-700 font-bold" />
               <button
               onClick={handleApplyCoupon}
               className="bg-gray-800 text-white px-6 py-2 rounded-r-md hover:bg-red-500 transition" > Apply
               </button>
            </div>

        </div>
          {/* Cart Totals */}
          <div className="mt-12 md:w-1/3 ml-auto border rounded-lg p-6 shadow bg-white">
          <h3 className="text-xl font-semibold mb-4 text-gray-800"> Cart Totals</h3>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className=" font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          {discount >0 &&(
            <div className="flex justify-between mb-2 text-green-600 font-medium">
                <span>Discount</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">₹{shipping.toFixed(2)}</span>
          </div>
           <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button onClick={handlePlaceOrder}
           className="mt-6 w-full py-3 rounded-full bg-yellow-400 hover:bg-yellow-400 text-white font-semibold transition"
          >
          Place Order
          </button>
       </div>
       
       </>
    )
};
export default Cart;