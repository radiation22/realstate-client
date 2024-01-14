import React, { useContext } from "react";
import Login from "../Login/Login";
import back from "../../assets/land3.jpeg";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const secondDivStyle = {
    backgroundImage: `url(${back})`,
    backgroundSize: "cover", // Adjust this based on your needs
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // Adjust the width as needed
    height: "90vh", // Adjust the height as needed
  };

  const { user } = useContext(AuthContext);

  return (
    <div style={secondDivStyle} className="flex w-full items-center px-10">
      <div
        // style={secondDivStyle}
        className="w-[70%] flex items-center justify-center text-white"
      >
        <h1 className="text-5xl font-bold">
          Buy or rent properties <br /> with no commission
        </h1>
      </div>
      <div>
        {user?.uid ? (
          <></>
        ) : (
          <>
            <Login></Login>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
