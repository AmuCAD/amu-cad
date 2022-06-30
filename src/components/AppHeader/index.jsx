import { Link } from "react-router-dom";
import styled from "styled-components";

function AppHeader() {
  return (
    <Header>
      <Link to={"/"}>
        <Logo>AmuCAD</Logo>
      </Link>
    </Header>
  );
}

const Header = styled.div`
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;
`;

const Logo = styled.h1`
  margin-left: 20px;
  font-size: 30px;
  color: #4A2882;
`;



export default AppHeader;
