import React, { useState } from "react";
import { FaPhoneSquareAlt, FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";

const Card = () => {
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isConditionsChecked, setIsConditionsChecked] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // State to track if the user has agreed

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAgree = () => {
    if (isTermsChecked && isConditionsChecked) {
      // User has agreed
      setIsAgreed(true);
    } else {
      alert("Please check both checkboxes to agree.");
    }
  };

  return (
    <div className="p-5">
      <div className="border border-gray-300 p-3 rounded my-3">
        <p>Navana Real Estate ltd.</p>
        <p>Verified Member</p>
        <p>Member since February 2023</p>
      </div>
      <div className="border border-gray-300 p-3 rounded my-3">
        <div>
          {/* Open the modal when the button is clicked */}
          <button
            className="bg-orange-700 text-white uppercase px-4 rounded py-1"
            onClick={openModal}
          >
            Contact Seller
          </button>
        </div>
        {isAgreed && ( // Display only when agreed
          <div className="flex gap-2 items-center">
            <FaPhoneSquareAlt />
            <p className="font-bold">Call Seller:</p>
          </div>
        )}
        {isAgreed && ( // Display only when agreed
          <div className="pl-5">
            <p>016202155532</p>
          </div>
        )}
      </div>

      <div className="border border-green-400 p-3 rounded">
        <p className="text-lg font-bold">Safety tips</p>
        <div className="py-2">
          <p>
            <li>Don’t go to unfamiliar places alone</li>
          </p>
          <p>
            <li>Don’t make full payment to 3rd parties</li>
          </p>
        </div>
        <a className="text-cyan-600" href="">
          See All Safety tips
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          className="custom-modal border-purple-500 p-5 rounded-md bg-stone-200"
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Contact Seller Modal"
          overlayClassName="modal-overlay"
          style={{
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000, // Set a higher z-index value
            },
          }}
        >
          <div className="modal-content">
            {/* Close button in the top right corner */}
            <div className="text-right">
              <button onClick={closeModal} className="close-button">
                <FaWindowClose />
              </button>
            </div>

            {/* Add your pop-up content here */}
            <h2>Contact Seller</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
              dolore, mollitia harum deserunt totam, alias quibusdam adipisci
              autem sint, et ab culpa. Veniam incidunt doloribus culpa mollitia
              reiciendis ab similique illo, consequuntur, rerum deleniti quos
              quod, maiores voluptate nostrum cumque placeat. Sapiente numquam,
              nam aperiam repellendus suscipit impedit nostrum reprehenderit.
            </p>

            {/* Checkboxes for terms and conditions */}
            <div className="mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                />
                I agree to the terms
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={isConditionsChecked}
                  onChange={() => setIsConditionsChecked(!isConditionsChecked)}
                />
                I agree to the conditions
              </label>
            </div>

            {/* Agree button */}
            <button
              onClick={handleAgree}
              className="w-full bg-amber-600 py-2 rounded-md text-white uppercase"
            >
              Agree
            </button>

            {/* Close button moved to the top right corner */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Card;
