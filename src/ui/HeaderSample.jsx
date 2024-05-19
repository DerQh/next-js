import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  faMessage,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../features/authentification/useUser";
import { logOutApi } from "../services/apiAuth";

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  border: none;
  color: black;
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border: none;
  @media (min-width: 310px) {
    padding: 10px;
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
  }
`;

const ToggleButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.1rem;
  cursor: pointer;

  @media (max-width: 368px) {
    font-size: 1.1rem;
  }
`;

// ----- NAVIGATION ITEMS ----//
const NavItems = styled.div`
  display: ${(props) => (props.$isopen ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  margin-top: 0;
  list-style: none;
  padding: 20px 22px 70px 22px;
  top: 100%;
  right: 0%;
  width: 100%;
  height: 100dvh;
  background-color: #fff;
  color: black;
  font-size: 16px;
  font-weight: 500;
  border: none;
  @media (min-width: 768px) {
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    height: fit-content;
    /* background-color: #464444; */
  }
  @media (min-width: 1024px) {
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: row;
    height: fit-content;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 8px;
  margin-bottom: 10px;
  color: black;
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  @media (min-width: 768px) {
    max-width: 100px;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    margin-top: 10px;
  }
  @media (min-width: 1024px) {
    max-width: 100px;
    flex-direction: row;
    height: 100%;
  }
`;

const StyledButton = styled.button`
  border-radius: 10px;
  padding: 13px 30px;
  margin-bottom: 20px;
  font-size: 15px;
  width: 100%;
  background-color: #234111;
  color: #fff;
  font-weight: 500;
  border: none;
  max-width: 500px;
  cursor: pointer;
  &:hover {
    color: #c8f169;
  }
  @media only screen and (max-width: 400px) {
    font-size: 14px;
    margin-bottom: 5px;
  }

  @media (min-width: 768px) {
    background-color: #234111;
    color: #ffffff;
    padding: 5px 7px;
    margin-bottom: 0px;
    font-weight: 450;
    border-radius: 15px;
  }

  @media (min-width: 1024px) {
    background-color: #234111;
    color: #ffffff;
    padding: 6px 2px;
    margin-bottom: 0px;
    font-weight: 450;
    border-radius: 16px;
  }
`;

const SignupParagraph = styled.div`
  font-size: 13px;
  color: black;
  font-weight: 500;
  margin-bottom: 30px;
  max-width: 400px;
  @media only screen and (max-width: 400px) {
    font-size: 12px;
    margin-bottom: 5px;
  }

  @media (min-width: 768px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
const P = styled.p`
  font-weight: 500;

  @media (min-width: 768px) {
    text-transform: capitalize;
    font-size: 15px;
    &:hover {
      background-color: #ffffff;
      font-weight: 600;
    }
  }

  @media (min-width: 1024px) {
    text-transform: capitalize;
    font-size: 16px;
    padding: 8px;
    &:hover {
      background-color: #ffffff;
      font-weight: 600;
    }
  }
`;

const ToggleDiv = styled.div`
  height: auto;
  padding: 5px 0 5px 10px;
  @media (min-width: 768px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MessageCount = styled.div`
  position: absolute;
  left: 19px;
  bottom: 24px;
  background-color: #fff;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessageCountInnner = styled.div`
  font-size: 9px;
  font-weight: 500;
  background-color: red;
  color: #fff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px;
  margin-bottom: 10px;
  color: black;
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  &:hover {
    background-color: #5e5e5f;
    color: #000;
  }
  @media only screen and (max-width: 400px) {
    font-size: 14px;
    gap: 10px;
    padding: 3px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
    gap: 10px;
    padding: 8px;
    &:hover {
      background-color: #ffffff;
    }
  }
  @media (min-width: 1024px) {
    font-size: 14px;
    gap: 10px;
    padding: 8px;
    &:hover {
      background-color: #ffffff;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    /* border: 2px solid black; */
  }
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row-reverse;
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 16px;
  align-items: center;
  border-radius: 50%;
`;

const LogoName = styled.h6`
  font-size: 29px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-left: -10px;
`;

const Icons = styled(FontAwesomeIcon)`
  color: #000;
  @media (min-width: 768px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

// ------MAIN -----//
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [logedIn, setIsLoggedin] = useState();
  const { user: userData, isLoading } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (userData) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [userData, logedIn, setIsLoggedin]);

  function handleClick() {
    logOutApi();
    navigate("/login");
  }

  return (
    <NavbarWrapper>
      <Brand>
        <Image src="/images/Image.jpg" alt="logo" />
        <LogoName> XPay</LogoName>
      </Brand>
      <ToggleDiv onClick={toggleMenu}>
        <ToggleButton>
          {isOpen ? <MenuCloseBar></MenuCloseBar> : <MenuOpenBar></MenuOpenBar>}
        </ToggleButton>
      </ToggleDiv>

      <NavItems $isopen={isOpen}>
        <NavLinks onClick={toggleMenu}>
          <NavLink to="/">
            <Icons icon={faHome} />
            <P>Home</P>
          </NavLink>
          <NavLink to="/overview">
            <Icons icon={faDoorOpen} />
            <P>Dashboard</P>
          </NavLink>
          <NavLink to="/group/overview">
            <Icons icon={faHandshakeAngle} />
            <P>Groups</P>
          </NavLink>
          <NavLink to="/transactions">
            <Icons icon={faCoins} />
            <P>Transactions</P>
          </NavLink>
          <NavLink to="/messages">
            {/* <MessageCount>
              <MessageCountInnner>1</MessageCountInnner>
            </MessageCount> */}
            <Icons icon={faMessage} />
            <P>Messages</P>
          </NavLink>
          <NavLink to="/settings">
            <Icons icon={faGear} />
            <P>Settings</P>
          </NavLink>
        </NavLinks>

        <ButtonDiv>
          <StyledButton onClick={handleClick}>
            {logedIn ? "Sign Out" : "Sign Up"}
          </StyledButton>
          {!logedIn && (
            <SignupParagraph>
              Already have an account?
              <span
                className="login-tag"
                href=""
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </SignupParagraph>
          )}
        </ButtonDiv>
      </NavItems>
    </NavbarWrapper>
  );
};

export default Navbar;

// const NavbarWrapper = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   text-align: center;
//   border: none;
//   color: black;
//   background-color: #fff;
//   height: 60px;
//   padding: 20px 20px 20px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1000;
//   border: none;

//   @media (max-width: 368px) {
//     padding: 5px 10px 5px 10px;
//     height: 50px;
//   }
//   @media (max-width: 768px) {
//   }
//   transition: top 0.5s;
//   ${({ $isvisible }) =>
//     !$isvisible && "top: -100px;"}/* Hide navbar when not visible */
// `;

// const ToggleButton = styled.div`
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;

//   @media (max-width: 768px) {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     cursor: pointer;
//   }
// `;

// const Brand = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: start;
//   font-size: 1.5rem;
//   cursor: pointer;

//   @media (max-width: 368px) {
//     font-size: 1.1rem;
//   }
// `;

// // ----- NAVIGATION ITEMS ----//
// const NavItems = styled.div`
//   visibility: hidden;
//   display: none;
//   position: absolute;
//   margin-top: 0;
//   list-style: none;
//   padding: 20px 22px 0 22px;
//   top: 100%;
//   /* left: 0%; */
//   right: 0%;
//   width: 100%;
//   height: 100dvh;
//   background-color: white;
//   color: black;
//   font-size: 16px;
//   font-weight: 500;
//   border: none;
//   @media (min-width: 768px) {
//     visibility: visible;
//     display: flex;
//   }

//   @media (min-width: 1024px) {
//     visibility: visible;
//     display: flex;
//   }
// `;

// const ButtonDiv = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* position: relative; */
// `;
// const ButtonInner = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   height: 100%;
//   padding-top: 30px;
//   /* position: absolute; */
//   /* top: 40%;
//   left: 50%;
//   width: 95%;
//   transform: translateX(-50%); */
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const StyledButton = styled.button`
//   border-radius: 10px;
//   padding: 13px 30px;
//   margin-bottom: 10px;
//   font-size: 15px;
//   width: 100%;
//   background-color: #234111;
//   color: #fff;
//   font-weight: 600;
//   border: none;
//   cursor: pointer;
//   &:hover {
//     color: #c8f169;
//     background-color: black;
//   }
// `;

// const SignupParagraph = styled.div`
//   font-size: 13px;
//   color: black;
//   font-weight: 500;
// `;
// const P = styled.p`
//   font-weight: 500;
// `;

// const ToggleDiv = styled.div`
//   height: auto;
//   padding: 5px 0 5px 10px;
//   @media (min-width: 768px) {
//     display: none;
//   }

//   @media (min-width: 1024px) {
//     display: none;
//   }
// `;

// const MessageCount = styled.div`
//   position: absolute;
//   left: 19px;
//   bottom: 24px;
//   background-color: #fff;
//   width: 16px;
//   height: 16px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const MessageCountInnner = styled.div`
//   font-size: 9px;
//   font-weight: 500;
//   background-color: red;
//   color: #fff;
//   width: 14px;
//   height: 14px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const NavLink = styled(Link)`
//   position: relative;
//   display: flex;
//   justify-content: flex-start;
//   gap: 20px;
//   padding: 10px;
//   margin-bottom: 10px;
//   color: black;
//   font-size: 1.1rem;
//   font-weight: 400;
//   text-decoration: none;
//   opacity: 0; /* Initially hide the links */
//   transform: translateY(50px); /* Move the links down by 20px */
//   transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out; /* Smooth transition effect for opacity and transform */
// `;
// const NavLinks = styled.div`
//   display: none;
//   padding-top: 10px;
// `;

// // ------MAIN -----//
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigateRef = useRef();
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(true);
//   const [logedIn, setIsLoggedin] = useState();

//   const { user: userData, isLoading } = useUser();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     const navLinks = document.getElementById("nav-links");
//     const links = document.querySelectorAll(".link");
//     const navmain = document.getElementById("navmain");
//     const animationTimeouts = [];

//     if (!isOpen) {
//       navLinks.style.display = "block";
//       navmain.style.visibility = "visible";
//       navmain.style.display = "block";
//       document.body.classList.add("no-scroll");

//       links.forEach((link, index) => {
//         const timeout = setTimeout(() => {
//           link.classList.add("visible");
//         }, 120 * index); // Adjust the delay as needed
//         animationTimeouts.push(timeout);
//       });
//     } else {
//       navLinks.style.display = "none";
//       navmain.style.visibility = "hidden";
//       navmain.style.display = "none";
//       animationTimeouts.forEach((timeout) => clearTimeout(timeout));

//       document.body.classList.remove("no-scroll");
//       links.forEach((link) => {
//         link.classList.remove("visible");
//       });
//     }
//   };

//   useEffect(() => {
//     if (userData) {
//       setIsLoggedin(true);
//     } else {
//       setIsLoggedin(false);
//     }
//   }, [userData, logedIn, setIsLoggedin]);

//   function handleClick() {
//     logOutApi();
//     navigate("/login");
//   }

//   return (
//     <NavbarWrapper ref={navigateRef} $isvisible={visible}>
//       <Brand>
//         <img className="logo-image" src="/images/Image.jpg" alt="logo"></img>
//         <h6 className="logo-name"> mindi's</h6>
//       </Brand>
//       <ToggleDiv onClick={toggleMenu}>
//         <ToggleButton>
//           {isOpen ? <MenuCloseBar></MenuCloseBar> : <MenuOpenBar></MenuOpenBar>}
//         </ToggleButton>
//       </ToggleDiv>

//       <NavItems id="navmain">
//         <div
//           onClick={toggleMenu}
//           className={`nav-links ${isOpen ? "open" : ""}`}
//           id="nav-links"
//         >
//           <NavLink to="/">
//             <FontAwesomeIcon icon={faHome} />
//             <P>Home</P>
//           </NavLink>
//           <NavLink to="/overview">
//             <FontAwesomeIcon icon={faDoorOpen} />
//             <P>Dashboard</P>
//           </NavLink>
//           <NavLink to="/group/overview">
//             <FontAwesomeIcon icon={faHandshakeAngle} />
//             <P>Groups</P>
//           </NavLink>
//           <NavLink to="/transactions">
//             <FontAwesomeIcon icon={faCoins} />
//             <P>Transactions</P>
//           </NavLink>
//           <NavLink to="/messages">
//             <MessageCount>
//               <MessageCountInnner>1</MessageCountInnner>
//             </MessageCount>
//             <FontAwesomeIcon icon={faMessage} />
//             <P>Messages</P>
//           </NavLink>
//           <NavLink to="/settings">
//             <FontAwesomeIcon icon={faGear} />
//             <P>Settings</P>
//           </NavLink>
//           <NavLink to="/users">
//             <FontAwesomeIcon icon={faUsers} />
//             <P>Family Members</P>
//           </NavLink>
//           <ButtonDiv>
//             <ButtonInner>
//               <StyledButton onClick={handleClick}>
//                 {logedIn ? "Sign Out" : "Sign Up"}
//               </StyledButton>
//               {!logedIn && (
//                 <SignupParagraph>
//                   Already have an account?
//                   <span
//                     className="login-tag"
//                     href=""
//                     onClick={() => navigate("/login")}
//                   >
//                     Log in
//                   </span>
//                 </SignupParagraph>
//               )}
//             </ButtonInner>
//           </ButtonDiv>
//         </div>
//       </NavItems>
//     </NavbarWrapper>
//   );
// };

// export default Navbar;
