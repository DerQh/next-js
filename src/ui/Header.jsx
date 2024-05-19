import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuCloseBar from "./MenuBar";
import MenuOpenBar from "./MenuBarOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faDoorOpen,
  faGear,
  faHandshakeAngle,
  faHome,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const StyledNav = styled.nav`
  position: relative;
  border: none;
  background-color: #043f2e;
  color: #fff;
  height: 60px;
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border: none;

  @media (max-width: 768px) {
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.5rem;
  cursor: pointer;
`;

// ----- NAVIGATION ITEMS ----//
const NavItems = styled.div`
  visibility: hidden;
  display: none;
  position: absolute;
  margin-top: 0;
  list-style: none;
  padding: 20px 15px;
  top: 100%;
  left: 0%;
  right: 0%;
  width: 100%;
  height: 100dvh;
  background-color: inherit;
  font-size: 16px;
  font-weight: 300;
  border: none;
  

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ToggleButton = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ButtonDiv = styled.div`
  /* border: 1px solid red; */
  margin-top: 10px;
  position: relative;
  height: 55vh;
`;
const ButtonInner = styled.div`
  /* border: 1px solid red; */
  position: absolute;
  bottom: 20%;
  left: 50%;
  width: 95%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  border-radius: 10px;
  padding: 13px 30px;
  margin-bottom: 10px;
  font-size: 14px;
  width: 100%;
  background-color: #c8f169;
  font-weight: 500;
  border: none;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: black;
  }
`;

// ----
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateRef = useRef();

  // ---------------click outside the nav
  useEffect(() => {
    function handleClickOutside(event) {
      if (navigateRef.current && !navigateRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ----------- JS TO TOGGLE THE MENU

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".link");
    const navmain = document.getElementById("navmain");
    const animationTimeouts = [];

    if (!isOpen) {
      navLinks.style.display = "block";
      navmain.style.visibility = "visible";
      navmain.style.display = "block";
      document.body.classList.add("no-scroll");

      links.forEach((link, index) => {
        const timeout = setTimeout(() => {
          link.classList.add("visible");
        }, 120 * index); // Adjust the delay as needed
        animationTimeouts.push(timeout);
      });
    } else {
      navLinks.style.display = "none";
      navmain.style.visibility = "hidden";
      navmain.style.display = "none";
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));

      document.body.classList.remove("no-scroll");
      links.forEach((link) => {
        link.classList.remove("visible");
      });
    }
  };

  return (
    <StyledNav ref={navigateRef}>
      <Brand>
        <img className="logo-image" src="/Image.jpg" alt="logo"></img>
        <h6 className="logo-name">mindis</h6>
      </Brand>
      <ToggleButton onClick={toggleMenu}>
        {isOpen ? (
          <MenuCloseBar className="icon">&times;</MenuCloseBar>
        ) : (
          <MenuOpenBar className="icon">&#9776;</MenuOpenBar>
        )}
      </ToggleButton>

      <NavItems id="navmain">
        <div className={`nav-links ${isOpen ? "open" : ""}`} id="nav-links">
          <Link to="/" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
          <Link to="/dashboard" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faDoorOpen} />
            <p>Dashboard</p>
          </Link>
          <Link to="/contribute" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faHandshakeAngle} />
            Contributions
          </Link>
          <Link to="/transactions" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faCoins} />
            Trasactions
          </Link>

          <Link to="/setting" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faGear} />
            Settings
          </Link>
          <Link to="/" className="link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUsers} />
            About
          </Link>
        </div>
        <ButtonDiv>
          <ButtonInner>
            <StyledButton>Sign Up </StyledButton>
            <div className="signup-paragraph">
              Already have an account?{" "}
              <a className="login-tag" href="">
                Log in
              </a>
            </div>
          </ButtonInner>
        </ButtonDiv>
      </NavItems>
    </StyledNav>
  );
}

export default Header;
