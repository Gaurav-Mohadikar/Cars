
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Star, Car, Fuel, Users, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const carouselItems = [
  // {
  //   id: 1,
  //   title: "Unlock your dream ride!",
  //   image: "https://i.pinimg.com/564x/ca/fe/8a/cafe8ae0da4cb351639d840879fae263.jpg",
  // },
  {
    id: 2,
    title: "Find your perfect match!",
    image: "https://i.pinimg.com/564x/c8/8f/be/c88fbe77a159916b106a7b7701dceaa9.jpg",
  },
  {
    id: 3,
    title: "Drive into luxury!",
    image: "https://i.pinimg.com/564x/fb/45/8b/fb458b377c9b8b8026d507cbfc88460f.jpg",
  },
  {
    id: 4,
    title: "Unique Cars for Unique Individuals!",
    image: "https://i.pinimg.com/564x/99/b3/6f/99b36f188456d5803af49264c373e23d.jpg",
  },
]

const logos = [
  { name: 'Maruti Suzuki', logo: 'https://i.pinimg.com/564x/80/0d/e2/800de2b4b41959f70be86e6c7454272c.jpg' },
  { name: 'Hyundai', logo: 'https://i.pinimg.com/564x/28/7c/4e/287c4e8a85379f2f8be2558f25bb04d1.jpg' },
  { name: 'Tata', logo: 'https://i.pinimg.com/564x/08/cc/c9/08ccc9d69f4b03e923c676c2a4822010.jpg' },
  { name: 'Mahindra', logo: 'https://i.pinimg.com/564x/be/d8/95/bed895c865a5c777452f22528da075ad.jpg' },
  { name: 'Toyota', logo: 'https://i.pinimg.com/564x/5f/31/43/5f3143a273dd854adfb9ec5fd8c185df.jpg' },
  { name: 'Kia', logo: 'https://i.pinimg.com/564x/b6/31/b7/b631b7dd261b8bc31d9168988b245fc8.jpg' },
  { name: 'Honda', logo: 'https://i.pinimg.com/564x/0b/f4/f3/0bf4f346b871684d0c407deb488e287a.jpg' },
  { name: 'MG', logo: 'https://i.pinimg.com/564x/4f/4e/44/4f4e449638357ea884a2c65ffed2f486.jpg' },
  { name: 'Renault', logo: 'https://i.pinimg.com/564x/4b/58/da/4b58da0ffeafd9b2a0c5326f228543ee.jpg' },
  { name: 'Volkswagen', logo: 'https://i.pinimg.com/564x/bb/15/29/bb152936c727e607711d7ea276cbc6d3.jpg' },
  { name: 'Skoda', logo: 'https://i.pinimg.com/564x/8e/74/79/8e74797514263c201bd31eac942ae7b4.jpg' },
  { name: 'Nissan', logo: 'https://i.pinimg.com/564x/d9/3a/e4/d93ae4c990f9b91391060feb9c01e151.jpg' },
  { name: 'Citroen', logo: 'https://i.pinimg.com/564x/c1/5d/75/c15d752abb0259e6b2dc130e85df50d8.jpg' },
  { name: 'Jeep', logo: 'https://i.pinimg.com/564x/73/ce/c1/73cec10db0311207b5028b25e194b80c.jpg' },
  { name: 'Aston Martin', logo: 'https://i.pinimg.com/564x/8c/1e/5f/8c1e5f4340f124d095541636e4dcb5c9.jpg' },
  { name: 'Audi', logo: 'https://i.pinimg.com/564x/26/9a/ec/269aec6bc2ac6381bf47b78819748aa1.jpg'},
]

const carData = {
  SUV: [
    { name: 'Mahindra Thar ROXX', price: '₹ 12.99 - 22.49 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Nexon', price: '₹ 8 - 15.50 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg', link: '/deals/rangerover' },
    { name: 'Mahindra Thar', price: ' ₹ 11.35 - 17.60 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar/10745/1697697308167/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Curvv', price: '₹ 10 - 19 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Curvv/9578/1723033064164/front-left-side-47.jpg' }
  ],
  Luxury: [
    { name: 'Mercedes-Benz GLA', price: '₹ 51.75 - 58.15 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Kia EV6', price: '₹ 60.97 - 65.97 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/EV6/8947/1654159762071/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Land Rover Defender', price: '₹ 1.04 - 1.57 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Defender/9081/Land-Rover-Defender-3.0-Diesel-110-X-Dynamic-HSE/1720674556929/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Land Rover Range Rover', price: ' ₹ 2.36 - 4.98 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Range-Rover/11540/1719037980777/front-left-side-47.jpg', link: '/deals/ev6' }
  ],
  MUV: [
    { name: 'Maruti Ertiga', price: 'Rs8.69 - 13.03 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1697697779799/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Toyota Innova Crysta', price: 'Rs19.99 - 26.30 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Renault Triber', price: '₹ Rs6 - 8.97 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/Triber/10066/1717586026066/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Maruti XL6', price: '₹ 11.61 - 14.77 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/XL6/10384/1688385191052/front-left-side-47.jpg', link: '/deals/ev6' }
  ]
}

function NewCars() {
  const [visibleBrands, setVisibleBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Luxury')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carName: '',
    carModel: '',
    year: '',
    condition: '',
    price: ''
  })

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsModalOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleBrands((prev) => {
        if (prev.length < logos.length) {
          return [...prev, logos[prev.length]]
        }
        return prev
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsModalOpen(false)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Sell Your Car</h2>
              <div className="mb-6 flex justify-between">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1/3 h-2 rounded-full ${
                      i <= step ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Personal Information</h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Car Details</h3>
                    <input
                      type="text"
                      name="carName"
                      placeholder="Car Name"
                      value={formData.carName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                      
                    <input
                      type="text"
                      name="carModel"
                      placeholder="Car Model"
                      value={formData.carModel}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <input
                      type="number"
                      name="year"
                      placeholder="Year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Additional Information</h3>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                    <input
                      type="text"
                      name="price"
                      placeholder="Expected Price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                   
                  </motion.div>
                )}
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-auto"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px]  overflow-hidden">
  {carouselItems.map((item, index) => (
    <div
      key={item.id}
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
        index === currentSlide ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Carousel content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
        {/* Carousel Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 text-center">
          {item.title}
        </h1>
        
        {/* Search Input */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-6 md:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Explore by brand, model or budget"
              className="w-full py-2 sm:py-3 px-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Browse Section */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Browse cars by</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { icon: Star, text: 'Brands' },
              { icon: Car, text: 'Body Type' },
              { icon: Fuel, text: 'Fuel Type' },
              { icon: Users, text: 'Seating Capacity' },
            ].map((button, index) => (
              <button
                key={index}
                className="flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                {React.createElement(button.icon, { className: 'w-4 h-4 sm:w-5 sm:h-5 mr-2' })}
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Previous Button */}
  <button
    onClick={prevSlide}
    className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
  >
    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
  </button>

  {/* Next Button */}
  <button
    onClick={nextSlide}
    className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
  >
    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
  </button>
</div>

   
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Brands in the Spotlight</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={isMounted ? { opacity: 0, y: 20 } : false}
                animate={isMounted ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-slate-300 transition-shadow duration-300"
              >
                <img
                  src={logo.logo} 
                  alt={`${logo.name} logo`}
                  className="w-20 h-16 object-contain mb-2 hover:filter transition-all duration-300"
                />
                <p className="text-sm font-medium text-center">{logo.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Find Right Cars by Body Type</h2>

        <div className="flex justify-center space-x-6 mb-6">
          {Object.keys(carData).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-lg font-semibold px-4 py-2 ${
                selectedCategory === category
                  ? 'text-orange-600 border-b-4 border-orange-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carData[selectedCategory].map((car, index) => (
            <div
              key={index}
              className="bg-slate-200 p-4 rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-gray-600">{car.price}</p>
                <a
                  
                  className="inline-block mt-4 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Contact Dealer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewCars