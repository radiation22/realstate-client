import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Filter state variables
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    // Fetch data from the URL
    fetch("http://localhost:5000/allProperty")
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setProperties(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  // Filter properties based on search, price range, and category
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
      (categoryFilter === "" || property.category === categoryFilter)
    );
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-emerald-600 py-5 ps-5">
        Real Estate & Properties for Sale or Rent in Bangladesh
      </h1>
      <div className="px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              {/* Location filter */}
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-md py-2 px-3 flex-grow"
              />

              {/* Price range filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border rounded-md py-2 px-3"
              >
                <option value="">Price Range</option>
                <option value="0-500000">0 - 500,000 TK</option>
                <option value="500000-1000000">500,000 - 1,000,000 TK</option>
                <option value="1000000-2000000">
                  1,000,000 - 2,000,000 TK
                </option>
                <option value="2000000-50000000">
                  2,000,000 - 50,000,000 TK
                </option>
              </select>

              {/* Category filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md py-2 px-3"
              >
                <option value="">Category</option>
                <option value="plot">Plot</option>
                <option value="flat">Flat</option>
                {/* Add more categories as needed */}
              </select>
            </div>
          </div>

          {filteredProperties.map((property) => (
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
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="py-4">{property.description.slice(0, 120)}...</p>
              <p className="text-xl font-bold text-emerald-600">
                Tk {property.price} total Price
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProperty;
