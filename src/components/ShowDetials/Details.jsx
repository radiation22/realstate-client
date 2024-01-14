import React, { useEffect, useState } from "react";
import land1 from "../../assets/land1.jpg";
import land2 from "../../assets/land2.webp";
import { useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import Card from "../InformationCard/Card";
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    // Fetch data from the URL
    fetch(`http://localhost:5000/details/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold">{details.title}</h1>
        <p className="text-gray-400">Posted on: {details.date}</p>
        <div className="flex items-center">
          <div className="w-[60%]">
            <img
              className="py-5 w-full h-[500px]"
              src={details.imageUrl}
              alt=""
            />
          </div>
          <div>
            <Card></Card>
          </div>
        </div>
        <h1 className="text-lg font-bold text-emerald-500">{details.price}</h1>
        <p className="mt-4">Address: {details.address}</p>
        <p>Land type: {details.landType}</p>
        <p>Land size: {details.landSize}</p>
        <h1 className="mt-5 text-lg font-bold">Description</h1>
        <p className="py-3">{details.description}</p>

        <p>Thank You So Much</p>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg flex items-center gap-3">
          More On Same Category<FaArrowCircleRight></FaArrowCircleRight>
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 py-5">
          <div className="flex border border-gray-400 justify-around shadow-lg p-4 rounded">
            <div>
              <img src={land2} alt="" />
            </div>
            <div>
              <h1>N - Block ♦ 4 katha South facing p</h1>
              <p>10.0 katha</p>
              <p>Tk 10,500,000 per katha</p>
              <p>Bashundhara r/a</p>
            </div>
          </div>
          <div className="flex border border-gray-400 justify-around shadow-lg p-4 rounded">
            <div>
              <img src={land2} alt="" />
            </div>
            <div>
              <h1>N - Block ♦ 4 katha South facing p</h1>
              <p>10.0 katha</p>
              <p>Tk 10,500,000 per katha</p>
              <p>Bashundhara r/a</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
