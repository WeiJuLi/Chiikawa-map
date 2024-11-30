import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map"; // Make sure this line is present
import Navbar from "./components/Navbar"; // Import the Navbar component
import logoImage from "./images/welcome.png";
//import addStores from './addStores';
import ContactForm from "./components/ContactForm";
import BackToTop from "./components/BackToTop";

const App = () => {
  const [selectedCountry, setSelectCountry] = useState("Taiwan");
  const [selectedRegion, setSelectRegion] = useState(null);
  const [ShowRegions, setShowRegions] = useState(true);
  /*
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [message, setMessage] = useState(''); // State for displaying messages
  */

  const handleCountryClick = (country) => {
    setSelectCountry(country);
    setSelectRegion(null);
    setShowRegions(true);
  };

  const handleRegionClick = (region) => {
    setSelectRegion(region);
    // This line is typically used for debugging purposes.
    // By logging the selected region to the console, you can verify that the correct region was selected and passed to the function
    console.log(`Selected region: ${region}`);
  };

  /*
  // New function to handle store import
  const handleImportStores = async () => {
    setLoading(true); // Set loading to true while importing
    setMessage('Importing stores...'); // Set a message for the user
    try {
      await addStores(); // Wait for addStores to complete
      setMessage('Stores added successfully!'); // Success message
    } catch (error) {
      setMessage('Error adding stores: ' + error.message); // Error message
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };
  */

  return (
    <div className="app">
      <Navbar />
      <section id="home" style={{ padding: "100px 20px 20px" }}>
        <img
          src={logoImage}
          alt="welcome"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            margin: "10px",
          }}
        ></img>

        {/* Country selection button */}
        <div>
          <button
            className="country-button"
            onClick={() => handleCountryClick("Taiwan")}
          >
            台灣
          </button>
          <button
            className="country-button"
            onClick={() => handleCountryClick("Japan")}
          >
            日本
          </button>
        </div>

        {/* Region selection button */}

        {ShowRegions && selectedCountry === "Taiwan" && (
          <div>
            <button
              className="region-button"
              onClick={() => handleRegionClick("North")}
            >
              北部
            </button>
            <button
              className="region-button"
              onClick={() => handleRegionClick("Central")}
            >
              中部
            </button>
            <button
              className="region-button"
              onClick={() => handleRegionClick("South")}
            >
              南部
            </button>
            <button
              className="region-button"
              onClick={() => handleRegionClick("East")}
            >
              東部
            </button>
          </div>
        )}

        {ShowRegions && selectedCountry === "Japan" && (
          <div>
            <button
              className="region-button"
              onClick={() => handleRegionClick("Kanto")}
            >
              關東
            </button>
            <button
              className="region-button"
              onClick={() => handleRegionClick("Kansai")}
            >
              關西
            </button>
            <button
              className="region-button"
              onClick={() => handleRegionClick("Other")}
            >
              其他
            </button>
          </div>
        )}
      </section>

      <section id="map" style={{ padding: "20px" }}>
        <Map
          selectedCountry={selectedCountry}
          selectedRegion={selectedRegion}
        />{" "}
        {/* The map component will be displayed here */}
      </section>
      <section id="contact" style={{ padding: "20px" }}>
        <ContactForm />
        {/* Contact form or details will go here */}
      </section>
      <BackToTop />
    </div>
  );
};

export default App;
