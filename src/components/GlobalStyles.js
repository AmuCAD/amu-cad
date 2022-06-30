import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  a {
    text-decoration: none;
    color: #000000;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 14px;
    background-color: #ffffff;
  }
`;

export default GlobalStyles;
