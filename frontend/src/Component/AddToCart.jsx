import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const fetchCartData = async () => {
  try {
    const response = await fetch('/api/cart', {
      method: 'GET',
      credentials : 'include',
      headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type" : 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart details');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return [];
  }
};

const handleRemoveFromCart = async (carId, setCartItems) => {
  try {
    const response = await fetch(`/api/cart/remove/${carId}`, {
      method: 'DELETE',
      credentials : 'include',
        headers : {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "content-type" : 'application/json'
        },
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }

    const updatedCart = await response.json();
    setCartItems((prevItems) => prevItems.filter((item) => item.car._id !== carId));
    console.log('Removed from cart:', updatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      try {
        const items = await fetchCartData();
        setCartItems(items);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <h2 className="text-lg font-semibold mb-6 text-blue-800">My Cart</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div key={item.car._id} className="bg-white rounded-lg shadow-md overflow-hidden relative group  shadow-orange-400">
              <div className="relative">
                <img
                  src={item.car.images[0]?.url || "/placeholder.svg"}
                  alt={`${item.car.brand} ${item.car.carName}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => handleRemoveFromCart(item.car._id, setCartItems)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <FaStar  className="h-6 w-6 text-red-500 transition-colors" />
                </button>
              </div>
              <div className="p-4 " style={{backgroundImage:`url(https://i.pinimg.com/control2/736x/5a/b1/47/5ab147fa272fa990884ffc7fe2a29b15.jpg) `}}>
                <h3 className="font-semibold text-lg mb-2 text-blue-800">
                  {item.car.carName} {item.car.brand}
                </h3>
                <p className="text-orange-600 font-bold">₹{(item.car.price / 100000).toFixed(2)}L</p>
                <Link
                  to={`/carsdata/${item.car._id}`}
                  className="mt-4 block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddToCart;
