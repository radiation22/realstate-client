import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const MyProperty = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  function calculateRemainingTime(startDate) {
    const now = new Date();
    const start = new Date(startDate);

    // Calculate the end date as 10 days from the start date
    const end = new Date(start.getTime() + 10 * 24 * 60 * 60 * 1000);

    let timeDiff = end - now;

    const days = Math.max(Math.floor(timeDiff / (1000 * 60 * 60 * 24)), 0);
    timeDiff -= days * 1000 * 60 * 60 * 24;

    const hours = Math.max(Math.floor(timeDiff / (1000 * 60 * 60)), 0);
    timeDiff -= hours * 1000 * 60 * 60;

    const minutes = Math.max(Math.floor(timeDiff / (1000 * 60)), 0);
    timeDiff -= minutes * 1000 * 60;

    const seconds = Math.max(Math.floor(timeDiff / 1000), 0);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    // Fetch data from the URL
    fetch(`http://localhost:5000/myProperty?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Function to update the countdown timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Update the properties' remaining time
      setProperties((prevProperties) =>
        prevProperties.map((property) => {
          const remainingTime = calculateRemainingTime(property.date);
          return { ...property, remainingTime };
        })
      );
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-5">
        All Of my Properties{" "}
      </h2>
      <div className="grid grid-cols-1 gap-3 px-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          properties.map((property) => {
            const remainingTime = calculateRemainingTime(property.date);

            return (
              <div
                className="flex border gap-5 items-center border-gray-400 justify-around shadow-lg p-4 rounded"
                key={property.id}
              >
                <div>
                  <img className="h-[200px]" src={property.imageUrl} alt="" />
                </div>
                <div>
                  <h1 className="font-bold">{property.title}</h1>
                  <p>Land Size: {property.landSize}</p>
                  <p>Price: {property.price}</p>
                  <button className="btn bg-black text-white px-4 rounded">
                    Delete
                  </button>
                </div>
                <div>
                  <div className="flex py-5 gap-4">
                    <div>
                      <strong className="text-2xl font-bold">Days</strong>
                      <p className="text-3xl text-center font-bold text-red-500">
                        {remainingTime.days}
                      </p>
                    </div>
                    <div>
                      <strong className="text-2xl font-bold">Hours</strong>
                      <p className="text-3xl text-center font-bold text-red-500">
                        {remainingTime.hours}
                      </p>
                    </div>
                    <div>
                      <strong className="text-2xl font-bold">Minutes</strong>
                      <p className="text-3xl text-center font-bold text-red-500">
                        {remainingTime.minutes}
                      </p>
                    </div>
                    <div>
                      <strong className="text-2xl font-bold">Seconds</strong>
                      <p className="text-3xl text-center font-bold text-red-500">
                        {remainingTime.seconds}
                      </p>
                    </div>
                  </div>
                  <button className="rounded-md px-3 py-2 text-white text-lg bg-gradient-to-r from-green-400 to-green-700">
                    Sent Your Legal Document Within the time
                  </button>
                  <p className="text-center">By This Gmail</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyProperty;
