import React, { useState } from 'react';
import logo from '../images/store_logo.PNG'

/*
This line defines a functional component called Navbar. 
In React, components can be defined as functions (functional components) that return JSX (JavaScript XML) to render UI.
(): Parentheses that can contain parameters. In this case, sectionId is the parameter, which will be passed to the function when it is called.
=>: This is the arrow that separates the parameter list from the function body. It signifies that what follows is the function's implementation.
{ ... }: Curly braces denote the body of the function, where the code to be executed is placed.
*/

const Navbar = () => {
  // 當你使用 useState 時，它會返回一個數組，這個數組的第一個元素是當前狀態的值，第二個元素是更新該狀態的函數。
  /*
    const state = useState(false);
    const menuOpen = state[0]; // 當前狀態值
    const setMenuOpen = state[1]; // 更新函數 
    可以簡化為下面格式
  */
  const [menuOpen, setMenuOpen] = useState(false);

    // 切換菜單的函數
    const toggleMenu = () => {
      setMenuOpen(!menuOpen); // 反轉menuOpen的值 False <--> True
    };
  
    // 關閉菜單的函數
    const closeMenu = () => {
      setMenuOpen(false); // 直接將菜單狀態設為關閉
    };


  const scrollToSection = (sectionId) => {
    //This line attempts to find the HTML element with the specified id (passed as sectionId) using document.getElementById(). 
    //It will return the DOM element if found, or null if not.
    const section = document.getElementById(sectionId);
    // if the element was found. If the element exists, we will execute the following code block.
    if (section) {
        //scrollIntoView() method is a built-in JavaScript function that brings the specified element into the visible area of the browser window. 
        //The { behavior: 'smooth' } option makes the scrolling smooth rather than abrupt.
        //The {} is used to create an object literal in JavaScript.
        //Many JavaScript functions accept an object as a parameter to allow for more flexible and descriptive function calls.
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // This line starts the return statement of the Navbar component, where we will define the JSX that represents what will be rendered on the screen.
  return (
    // outer bracket : Switching from HTML to JavaScript, inner bracket means javascript object 
    // onClick attribute specifies an event handler that will call the scrollToSection function when the title is clicked, passing 'home' as the argument. 
    // ()=> means arrow function : 
    /*Direct Call: Calling the function directly (scrollToSection('home')) executes it immediately, which is usually not what you want for event handlers.
    Arrow Function: Allows you to delay execution until the event occurs.
    */
    <nav className="navbar">
      <img
        src={logo} // Use the imported logo here
        alt="吉伊卡娃 買娃地圖 Logo" // Alt text for accessibility
        onClick={() => scrollToSection('home')} // Makes the logo clickable to scroll to home
        style={{ cursor: 'pointer', height: '60px' }} // Adjust height as needed
        className="navbar-logo"
      />

      {/* Menu : If menuOpen is TRUE then the class names menu and show will be applied to the <ul>*/}
      <ul className={menuOpen ? 'menu show' : 'menu'} style={{ listStyle: 'none', gap: '20px', margin: 0 }}>
        <li onClick={() => scrollToSection('map')} style={{ cursor: 'pointer' }}>地圖</li>
        <li onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer' }}>聯繫我</li>
      </ul>

      {/* For Mobile */}
      <button onClick={toggleMenu} className="menu-toggle" style={{ color: menuOpen ? 'white' : '#a2a880' }}>
        {/* The <span> element is an inline container used to apply styles or functionality to a specific piece of content.
            The className attribute in React is used to assign CSS classes to elements, enabling styling and icon rendering from libraries like Material Icons. */}
        <span className="material-icons" style={{ fontSize: '35px' }}>
          {menuOpen ? 'close' : 'menu'} {/* 使用 'close' 或 'menu' 根據狀態 */}
        </span>
      </button>

      {/* Display additional menu items if menu is open */}
      {menuOpen && (
        <ul className="dropdown-menu" style={{ backgroundColor: '#a2a880', color: 'white', position: 'fixed', top: 0, left: 0, height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <li onClick={() => { scrollToSection('map'); closeMenu(); }} style={{ cursor: 'pointer', padding: '20px', color: 'white' }}>地圖</li>
          <li onClick={() => { scrollToSection('contact'); closeMenu(); }} style={{ cursor: 'pointer', padding: '20px', color: 'white' }}>聯繫我</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
