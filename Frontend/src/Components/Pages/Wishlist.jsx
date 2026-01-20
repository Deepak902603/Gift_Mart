import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlist(storedWishlist);
    }, []);

    const removeFromWishlist = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to remove this item from Wishlist?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedWishlist = wishlist.filter(item => item.id !== id);
                setWishlist(updatedWishlist);
                localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
                toast.success('Item removed from Wishlist');
            }
        });
    };

    const addToCart = (product) => {
        toast.success(`${product.Name} added to cart`);
        // You can also push to a cart array in localStorage here if needed
    };

    return (
        <>
            <div className='w-full px-4 sm:px-8 lg:px-[12%] py-12 bg-white text-gray-800'>
                <Toaster position='top-right' reverseOrder={false} />
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 font-bricolage'>
                    💗 My Wishlist
                </h1>

                {wishlist.length === 0 ? (
                    <div className='text-center py-10 text-gray-500'>
                        <i className="ri-emotion-sad-line text-2xl mr-2"></i>
                        No items in your Wishlist!
                    </div>
                ) : (
                    <div className='overflow-hidden hidden md:block'>
                        <table className='w-full text-left border-separate border-spacing-y-6'>
                            <thead>
                                <tr className='text-sm text-gray-500 border-b border-gray-200'>
                                    <th></th>
                                    <th className='py-3'>Product</th>
                                    <th className='text-center'>Unit Price</th>
                                    <th className='text-center'>Stock</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((product) => (
                                    <tr key={product.id} className='bg-white border rounded-xl shadow-sm'>
                                        <td className='align-middle text-center'>
                                            <button
                                                onClick={() => removeFromWishlist(product.id)}
                                                className='text-xl text-gray-400 hover:text-red-500 p-3'
                                                title='Remove'
                                            >
                                                <i className='ri-close-line'></i>
                                            </button>
                                        </td>
                                        <td className='flex items-center gap-4 py-4 px-2'>
                                            <img
                                                src={product.ProductsImage}
                                                alt={product.Name}
                                                className='w-24 h-24 object-contain border p-2 rounded-lg'
                                            />
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{product.Name}</h3>
                                                <p className="text-sm text-gray-500">{product.Category}</p>
                                            </div>
                                        </td>
                                        <td className='text-center align-middle'>
                                            ₹{product.Price}
                                        </td>
                                        <td className='text-center align-middle'>
                                            {product.InStock ? 'In Stock' : 'Out of Stock'}
                                        </td>
                                       
                                        <td className='text-center align-middle'>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className='text-sm bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded'
                                            >
                                                Add to Cart
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* {Mobile view} */}

                <div className=' md:hidden space-y-6'>
                    { wishlist.map(product=>(
                        <div key={product.id} className='bg-white border shadow-sm rounded-xl'>
                            <div className='flex justify-between items-center'>
                                <h3 className="text-lg font-semibold">{product.Name}</h3>
                              <button onClick={()=>removeFromWishlist(product.id)}
                               className='text-xl text-gray-400 hover:text-red-500'
                               title='Remove' >
                                <i className="ri-close-line"></i>
                              </button>
                            </div>
                            <img src={product.ProductsImage} 
                            alt={product.Name} 
                             className='w-full h-40 object-contain border p-2 rounded-lg' /> 
                            <p className='text-sm text-gray-500'>{product.Category}</p> 
                            <div className='text-base font-semibold text-gray-800'>
                              Price:{product.Price}  
                            </div>
                            <div className='text-green-600 text-sm font-medium flex items-center'><i className='ri-checkbox-circle-line text-lg'></i>In Stock
                            </div>
                             <button onClick={()=>addToCart(product)}
                               className='w-full inline-flex justify-center items-center gap-4' 
                                >
                                <i className='ri-shopping-cart-2-line'></i>Add to Cart    
                            </button>  
                        </div>
                    ))

                    }

                </div>
            </div>
        </>
    );
};

export default Wishlist;
