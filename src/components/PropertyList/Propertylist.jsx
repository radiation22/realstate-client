import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Propertylist = () => {
  // State variables
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state

  // React Router navigation
  const navigate = useNavigate();

  // Function to navigate to property details
  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  // Fetch property data from the server on component load
  useEffect(() => {
    fetch("http://localhost:5000/allProperty")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Filter properties based on search, price range, and filter amount
  const filteredProperties = properties.filter((property) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseTitle = property.address.toLowerCase();
    const numericPrice = property.price;

    return (
      lowerCaseTitle.includes(lowerCaseQuery) &&
      (priceRange === "" ||
        (priceRange === "0-500000" && numericPrice <= 500000) ||
        (priceRange === "500000-1000000" &&
          numericPrice > 500000 &&
          numericPrice <= 1000000) ||
        (priceRange === "1000000-2000000" &&
          numericPrice > 1000000 &&
          numericPrice <= 2000000) ||
        (priceRange === "2000000-50000000" &&
          numericPrice > 2000000 &&
          numericPrice <= 50000000)) &&
      (categoryFilter === "" || property.category === categoryFilter) &&
      (filterAmount === "" || parseInt(filterAmount) <= numericPrice)
    );
  });

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-emerald-600 py-5">
          Real Estate & Properties for Sale or Rent in Bangladesh
        </h1>
        <div className="md:flex justify-between items-center py-5">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md py-2 px-3 mb-2 md:mb-0"
          />

          <div className="md:flex items-center space-x-4">
            <div className="mb-2 md:mb-0">
              <label htmlFor="priceRange" className="mr-2">
                Price Range:
              </label>
              <select
                id="priceRange"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border rounded-md py-2 px-3"
              >
                <option value="">All</option>
                <option value="0-500000">0 - 50,0000 TK</option>
                <option value="500000-1000000">50,0000 - 100,0000 TK</option>
                <option value="1000000-2000000">100,0000 - 200,0000 TK</option>
                <option value="2000000-50000000">2000000 - 500,00000 TK</option>
              </select>
            </div>

            {/* Category filter */}
            <div className="mb-2 md:mb-0">
              <label htmlFor="categoryFilter" className="mr-2">
                Category:
              </label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md py-2 px-3"
              >
                <option value="">All</option>
                <option value="plot">Plot</option>
                <option value="flat">Flat</option>
                {/* Add more categories as needed */}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            filteredProperties.map((property) => (
              <div
                key={property._id}
                className="border p-3 rounded-md shadow-lg transition transform hover:scale-105 cursor-pointer"
                onClick={() => handleDetails(property._id)}
              >
                <img
                  className="rounded w-full h-[300px]"
                  src={property.imageUrl}
                  alt=""
                />
                <div className="flex items-center gap-3 mt-3">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <p className="font-bold text-gray-500">{property.address}</p>
                </div>
                <p className="font-bold text-gray-500">
                  Posted On: {property.date}
                </p>
                <h2 className="text-xl font-bold">{property.title}</h2>
                <p className="py-4">{property.description.slice(0, 150)}...</p>
                <p className="text-xl font-bold text-emerald-600">
                  Tk {property.price} total Price
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Propertylist;
