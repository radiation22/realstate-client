import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const AddProperty = () => {
  const { handleSubmit, control, reset, register } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const uploadImageToImgBB = async (imageFile) => {
    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", imageFile);

      // Your ImgBB API key
      const apiKey = "8c45a65277afef5acc89d1665e868e9c";

      // Make a POST request to the ImgBB API endpoint
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        // The uploaded image URL is available in data.data.url
        return data.data.url;
      } else {
        // Handle the error if the request fails
        throw new Error("Image upload failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    const imageUrl = await uploadImageToImgBB(selectedFile);
    console.log(data);
    const title = data.title;
    const address = data.address;
    const landSize = data.landSize;
    const landType = data.landType;
    const description = data.message;
    const price = data.price;
    const category = data.category;

    const property = {
      title,
      address,
      landSize,
      landType,
      description,
      price,
      imageUrl,
      category,
      email: user?.email,
      date: new Date().toLocaleDateString(), // Format the date as desired
    };

    fetch("http://localhost:5000/addProperty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Added Successfully");
          navigate("/allProperty");
        }
      });
  };
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">
        Add Your Property Details for selling
      </h2>
      <div>
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block font-medium text-gray-700"
              >
                Title
              </label>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="title"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter title"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block font-medium text-gray-700"
              >
                Address
              </label>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="address"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter address"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="landType"
                className="block font-medium text-gray-700"
              >
                Land Type
              </label>
              <Controller
                name="landType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="landType"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter land type"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="landSize"
                className="block font-medium text-gray-700"
              >
                Land Size
              </label>
              <Controller
                name="landSize"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="text"
                    id="landSize"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter land size"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block font-medium text-gray-700"
              >
                Description
              </label>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    required
                    {...field}
                    id="message"
                    rows="4"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter message"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block font-medium text-gray-700"
              >
                Total Price
              </label>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="number"
                    id="price"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Enter price"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block font-medium text-gray-700"
              >
                Category
              </label>
              <select
                {...register("category")} // Use register instead of Controller for select input
                id="category"
                required
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              >
                <option value="plot">Plot</option>
                <option value="flat">Flat</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block font-medium text-gray-700"
              >
                Photo
              </label>
              <Controller
                name="photo"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <input
                    required
                    {...field}
                    type="file"
                    id="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                )}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
