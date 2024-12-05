import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';

const fetchCarsData = async (budget, brands) => {
  try {
    const brandsQuery = brands.length > 0 ? `&make=${brands.join(',')}` : '';
    const response = await fetch(
      `/api/cars/cars?budgetMin=${budget[0]}&budgetMax=${budget[1]}${brandsQuery}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const filteredCars = data
      .filter(
        (car) =>
          car.price >= budget[0] &&
          car.price <= budget[1] &&
          (brands.length === 0 || brands.includes(car.brand))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt in descending order

    console.log('Fetched and sorted data by createdAt:', filteredCars);
    return filteredCars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

function UsedCars() {
  const [budget, setBudget] = useState([0, 2500000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const makes = [
    "tata", "maruti suzuki", "hyundai", "honda", "mahindra", 
    "kIA", "nissan", "toyota", "ford",
  ];

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const filteredCars = await fetchCarsData(budget, selectedBrands);
        setCars(filteredCars);
      } catch (error) {
        console.error('Error loading cars:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadCars();
  }, [budget, selectedBrands]);

  const handleBudgetChange = (e) => {
    const newBudget = parseInt(e.target.value);
    setBudget([newBudget, 2500000]);
    if (window.innerWidth < 1024) setShowFilters(false);
  };

  const handleMakeChange = (selectedMake) => {
    setSelectedBrands(prev => {
      if (prev.includes(selectedMake)) {
        return prev.filter(brand => brand !== selectedMake);
      } else {
        return [...prev, selectedMake];
      }
    });
    if (window.innerWidth < 1024) setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleAddToCart = async (carId) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type": 'application/json'
        },
        body: JSON.stringify({ carId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const updatedCart = await response.json();
      setCartItems((prev) => ({ ...prev, [carId]: true }));
      console.log('Added to cart:', updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (carId) => {
    try {
      const response = await fetch(`/api/cart/remove/${carId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }

      const updatedCart = await response.json();
      setCartItems((prev) => ({ ...prev, [carId]: false }));
      toast.success(`Removed from cart: ${updatedCart}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <button
        onClick={toggleFilters}
        className="lg:hidden mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`col-span-1 lg:sticky lg:top-20 h-fit bg-gray-100 rounded-lg shadow-md p-4 mt-10 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <h2 className="text-lg font-semibold mb-4 text-blue-800">Filters</h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-blue-700">Budget</h3>
            <input
              type="range"
              min="150000"
              max="2500000"
              step="50000"
              value={budget[0]}
              onChange={handleBudgetChange}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-sm text-blue-600">
              <span>₹{(budget[0] / 100000).toFixed(2)}L</span>
              <span>₹{(budget[1] / 100000).toFixed(2)}L</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-blue-700">Make</h3>
            {makes.map((makeName) => (
              <div key={makeName} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={makeName}
                  checked={selectedBrands.includes(makeName)}
                  onChange={() => handleMakeChange(makeName)}
                  className="mr-2 form-checkbox text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor={makeName} className="text-sm text-blue-700 cursor-pointer">
                  {makeName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No cars found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="bg-white rounded-lg overflow-hidden relative group shadow-md shadow-orange-400">
                  <div className="relative">
                    <img
                      src={car.images[0]?.url || "/placeholder.svg"}
                      alt={`${car.brand} ${car.carName}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={() => {
                        cartItems[car._id]
                          ? handleRemoveFromCart(car._id)
                          : handleAddToCart(car._id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                      {cartItems[car._id] ? (
                        <FaStar className="h-6 w-6 text-red-500 transition-colors" />
                      ) : (
                        <FaRegStar className="h-6 w-6 text-gray-400 transition-colors" />
                      )}
                    </button>
                  </div>
                  <div className="p-4" style={{backgroundImage: `url(https://i.pinimg.com/736x/5a/b1/47/5ab147fa272fa990884ffc7fe2a29b15.jpg)`}}>
                    <h3 className="font-semibold text-lg mb-2 text-blue-800">
                      {car.brand} {car.carName}
                    </h3>
                    <p className="text-orange-600 font-bold">₹{(car.price / 100000).toFixed(2)}L</p>
                    <Link 
                      to={`/carsdata/${car._id}`}
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
      </div>
    </div>
  );
}

export default UsedCars;

