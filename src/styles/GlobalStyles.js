import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`



 html{
     scroll-behavior: auto;

 }

  * {
    font-family: "Inter", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    letter-spacing: .04em;
      
  }


 


  .overview-member{
  text-align: center;
  color: black;
  font-weight: 100;
  font-size:12px;
  letter-spacing: 1px;
  line-height: normal;

  }


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 10px;
}
/* 
.nav-links {
  display: none;
  padding-top: 10px;
  @media (min-width: 768px) {
    display: flex;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
} */



@media (max-width: 368px) {
  .link{
    gap: 10px;
    padding: 5px;
    margin-bottom: 10px;
    color: black;
    font-size: 1rem;
    font-weight: 400;
  }
   
  }

.link.visible {
  opacity: 1; /* Show the links */
  transform: translateY(0); /* Move the links back to their original position */
}

.link:hover {
  background-color: #fff;
  color: black;
  border-radius: 6px;
}
.nav{
  display: none;  
  opacity: 0;
  transform: translateY(20px); /* Move the links down by 20px */
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out; /* Smooth transition effect for opacity and transform */

}
.no-scroll {
  overflow: hidden;
}

.nav.on{
  display: block;
  opacity: 1;

}

.login-tag {
  text-decoration: none;
  color: green;
  font-weight: 500;
  padding: 0 4px;
  &:hover{
    color:  #78C51C;;
    font-size: 12px;
  }
  
}


 /* TRANSACTION CSS  */


`;

export default GlobalStyles;

// .sample{
//   --e-global-color-uicore_primary: #C8F169;
//   --e-global-color-uicore_secondary: #78C51C;
//   --e-global-color-uicore_accent: #FB848B;
//   --e-global-color-uicore_headline: #03000A;
//   --e-global-color-uicore_body: #262B40;
//   --e-global-color-uicore_dark: #043F2E;
//   --e-global-color-uicore_light: #F7F9FC;
//   --e-global-color-uicore_white: #FFFFFF;
//   --e-global-typography-uicore_primary-font-family: "Inter";
//   --e-global-typography-uicore_primary-font-weight: 600;
//   --e-global-typography-uicore_secondary-font-family: "Inter";
//   --e-global-typography-uicore_secondary-font-weight: 500;
//   --e-global-typography-uicore_text-font-family: "Inter";
//   --e-global-typography-uicore_text-font-weight: normal;
//   --e-global-typography-uicore_accent-font-family: "Lora";
//   --e-global-typography-uicore_accent-font-weight: normal;
// }

// Shades of Green:
// Light Green: #90EE90
// Medium Green: #00FF00
// Dark Green: #008000
// Blue:
// Sky Blue: #87CEEB
// Dodger Blue: #1E90FF
// Navy Blue: #000080
// Yellow:
// Light Yellow: #FFFFE0
// Yellow: #FFFF00
// Goldenrod: #DAA520
// Neutral Colors:
// White: #FFFFFF
// Beige: #F5F5DC
// Gray: #808080
// Brown: #A52A2A
// Earth Tones:
// Tan: #D2B48C
// Sandy Brown: #F4A460
// Sienna: #A0522D
// Complementary Colors:
// Red: #FF0000
// Purple: #800080
// Analogous Colors:
// Blue-Green: #00CED1
// Yellow-Green: #9ACD32
// Crimson: #DC143C
// Scarlet: #FF2400
// Ruby Red: #9B111E
// Maroon: #800000
// Brick Red: #B22222
// Candy Apple Red: #FF0800
// Cherry Red: #FF4545
// Firebrick: #B22222
// Burgundy: #800020
// Rose Red: #C21E56
