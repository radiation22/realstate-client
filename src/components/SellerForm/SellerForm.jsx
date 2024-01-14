import React, { useState } from "react";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SellerForm = () => {
  const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // State variables for input values and correctness
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [input3Value, setInput3Value] = useState("");

  const [isInput1Correct, setIsInput1Correct] = useState(false);
  const [isInput2Correct, setIsInput2Correct] = useState(false);
  const [isInput3Correct, setIsInput3Correct] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAgreed(false); // Reset isAgreed when modal is closed
    setInput1Value(""); // Reset input values
    setInput2Value("");
    setInput3Value("");
    // Reset correctness indicators
    setIsInput1Correct(false);
    setIsInput2Correct(false);
    setIsInput3Correct(false);
  };

  const handleFirstCheckboxChange = () => {
    setIsFirstCheckboxChecked(!isFirstCheckboxChecked);
  };

  const handleSecondCheckboxChange = () => {
    setIsSecondCheckboxChecked(!isSecondCheckboxChecked);
  };

  const handleAgree = () => {
    if (isFirstCheckboxChecked && isSecondCheckboxChecked) {
      setIsAgreed(true);
      openModal();
    } else {
      alert("Please check both checkboxes to continue.");
    }
  };

  const handleDisagree = () => {
    setIsFirstCheckboxChecked(false);
    setIsSecondCheckboxChecked(false);
    setIsAgreed(false);
  };

  const handleInput1Change = (e) => {
    const value = e.target.value.toLowerCase();
    setInput1Value(value);
    setIsInput1Correct(value === "1");
  };

  const handleInput2Change = (e) => {
    const value = e.target.value.toLowerCase();
    setInput2Value(value);
    setIsInput2Correct(value === "2");
  };

  const handleInput3Change = (e) => {
    const value = e.target.value.toLowerCase();
    setInput3Value(value);
    setIsInput3Correct(value === "3");
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if all answers are correct
    if (isInput1Correct && isInput2Correct && isInput3Correct) {
      // Create an array of correct answers
      const correctAnswers = [input1Value, input2Value, input3Value];

      // Log the correct answers to the console
      console.log("Correct Answers:", correctAnswers);

      // You can submit the form or perform any other action here.
      console.log("Form submitted");
      navigate("/allProperty");
    } else {
      alert("Please provide correct answers for all fields.");
    }
  };

  return (
    <div>
      <h1 className="text-center">
        The Largest Real Estate Marketing Portal in Bangladesh
      </h1>
      {isAgreed ? (
        <div></div>
      ) : (
        <div className="border border-purple-600 p-5 mx-auto w-[90%]">
          <h1 className="text-2xl font-bold text-center">
            Terms and Conditions
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            consectetur, exercitationem, ex delectus corrupti iste aliquid
            soluta totam magni deleniti odit tenetur, vel quae aperiam sit
            maxime labore! Quae officia corporis, laudantium tenetur repellendus
            mollitia earum, voluptatum nihil harum libero vitae vel. Ratione
            voluptas sequi in saepe cupiditate impedit expedita at dolorum
            temporibus corrupti nostrum, natus ex officiis eius quidem vero a
            sunt dignissimos odit distinctio quia? Distinctio voluptas molestias
            eveniet esse aliquid, totam, error laudantium quod impedit
            voluptatem sapiente fuga placeat ipsam vel porro eius sequi. Sit
            illum animi vel accusamus blanditiis eligendi provident quaerat
            facilis! Ullam, voluptatibus optio!
          </p>
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={isFirstCheckboxChecked}
                onChange={handleFirstCheckboxChange}
              />
              I have read and understood the terms and conditions
            </label>
          </div>
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={isSecondCheckboxChecked}
                onChange={handleSecondCheckboxChange}
              />
              I agree to the Terms and Conditions
            </label>
          </div>
          <button
            onClick={handleDisagree}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Disagree
          </button>
          <button
            onClick={handleAgree}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Agree
          </button>
        </div>
      )}
      <Modal
        className="custom-modal w-1/2 mx-auto p-5 border-purple-500 bg-stone-200"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Agreement Modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={false}
      >
        <div className="modal-content">
          <div className="text-right">
            <button onClick={closeModal} className="close-button">
              <FaWindowClose></FaWindowClose>
            </button>
          </div>
          <h2>Agreement Form</h2>
          <p>
            This is the agreement form content that you can customize as needed.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Input 1 */}
            <div className="mb-4">
              <label htmlFor="input1">Input 1:</label>
              <input
                type="text"
                id="input1"
                placeholder="Enter input 1"
                className={`border text-black rounded w-full ${
                  isInput1Correct ? "border-green-500" : "border-red-500"
                }`}
                value={input1Value}
                onChange={handleInput1Change}
              />
              {isInput1Correct ? (
                <p className="text-green-500">Correct answer</p>
              ) : (
                <p className="text-red-500"></p>
              )}
            </div>

            {/* Input 2 */}
            <div className="mb-4">
              <label htmlFor="input2">Input 2:</label>
              <input
                type="text"
                id="input2"
                placeholder="Enter input 2"
                className={`border text-black rounded w-full ${
                  isInput2Correct ? "border-green-500" : "border-red-500"
                }`}
                value={input2Value}
                onChange={handleInput2Change}
              />
              {isInput2Correct ? (
                <p className="text-green-500">Correct answer</p>
              ) : (
                <></>
              )}
            </div>

            {/* Input 3 */}
            <div className="mb-4">
              <label htmlFor="input3">Input 3:</label>
              <input
                type="text"
                id="input3"
                placeholder="Enter input 3"
                className={`border text-black rounded w-full ${
                  isInput3Correct ? "border-green-500" : "border-red-500"
                }`}
                value={input3Value}
                onChange={handleInput3Change}
              />
              {isInput3Correct ? (
                <p className="text-green-500">Correct answer</p>
              ) : (
                <></>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 py-2 rounded-md text-white uppercase"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SellerForm;
