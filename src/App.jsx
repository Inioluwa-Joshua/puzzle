import "./App.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Only useParams is needed now
import SplashScreen from "./components/SplashScreen.jsx";
import Modal from "./components/Modal.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { id } = useParams(); // Get id from URL
  const [box, setBox] = useState([]);
  const [steps, setSteps] = useState(0);
  const [isPlayer, setIsPlayer] = useState(null); // Track user validation status
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [username, setUsername] = useState(""); // Store the player's username

  console.log(id);

  // Middleware to check if the user is a valid player
  const checkPlayerStatus = async () => {
    try {
      const response = await fetch(`https://gamesbyini.com/api/player/${id}`, {
        method: "GET",
        credentials: "include", // Include cookies if necessary
      });

      if (!response.ok) {
        throw new Error("User validation failed");
      }

      const data = await response.json();

      if (data.isPlayer) {
        setIsPlayer(true);
        setUsername(data.username); // Store username for welcome toast
        toast.success(`Welcome, ${data.username}!`);
      } else {
        setIsPlayer(false);
        setShowPopup(true); // Show popup for non-player
      }
    } catch (error) {
      console.error("Error validating user:", error);
      setIsPlayer(false);
      setShowPopup(true); // Show popup in case of error
    }
  };

  const click = (e, i) => {
    const arr = [...box];

    if (arr[i + 1] === 0) {
      if (i !== 2 && i !== 5) {
        arr[i + 1] = e;
        arr[i] = 0;
      }
    }
    if (arr[i - 1] === 0) {
      if (i !== 3 && i !== 6) {
        arr[i - 1] = e;
        arr[i] = 0;
      }
    }

    if (arr[i + 3] === 0) {
      arr[i + 3] = e;
      arr[i] = 0;
    }
    if (arr[i - 3] === 0) {
      arr[i - 3] = e;
      arr[i] = 0;
    }

    setBox(arr);
    setSteps((steps) => steps + 1);
  };

  useEffect(() => {
    if (!id) {
      // If no ID is provided in the URL, show popup immediately
      setIsPlayer(false);
      setShowPopup(true);
      return;
    }

    // Validate the user on app load
    checkPlayerStatus();

    const arr = [];
    while (arr.length < 9) {
      const random = Math.floor(Math.random() * 9);
      if (arr.indexOf(random) === -1) {
        arr.push(random);
      }
    }

    setBox(arr);
  }, [id]);

  if (isPlayer === null) {
    // Show loading screen while checking player status
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)} // Close the popup on click
        >
          <div
            className="bg-white rounded-lg p-6 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing popup
          >
            <h2 className="text-xl font-bold text-red-600">
              You Are Not a Registered Player
            </h2>
            <p className="mt-4">
              Please register or login to gain access to the game.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isPlayer && (
        <>
          <SplashScreen />
          <Modal box={box} steps={steps} />
          <div className={"w-dvw h-dvh grid place-items-center"}>
            <div className={"fixed left-0 top-6 right-0 text-center text-3xl"}>
              Puzzle
            </div>
            <div
              className={
                "w-[90%] max-w-[15rem] grid grid-cols-3 gap-1.5 border-2 border-indigo-600 p-1.5"
              }
            >
              {box.map((e, i) => (
                <button
                  className={`h-16 grid ${
                    e === 0
                      ? "opacity-0 transition-none"
                      : "opacity-100 transition-all"
                  } place-items-center bg-indigo-600`}
                  key={i}
                  onClick={() => click(e, i)}
                  disabled={e === 0}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
