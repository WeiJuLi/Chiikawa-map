import React, { useState, useEffect } from "react";
import "./BackToTop.css";
import toTop from "../images/top.png";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.scrollY > 300) && (window.innerWidth > 768)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll); // Clean up listeners
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="backToTop">
      <button
        className="backToTopButton"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={scrollToTop}
        title="Go to top"
      >
        <img src={toTop} alt="Go to top" />
      </button>
    </div>
  );
}

export default BackToTop;
