import { Link } from "react-router-dom";
import styled from "styled-components";

function AppHeader() {
  return (
    <Header>
      <Link to={"/"}>
        <Flex>
          <Logo src="/images/icons/logo.png" alt="이미지 없음" />
          <Brand>AMUCAD</Brand>
        </Flex>
      </Link>
    </Header>
  );
}

const Flex = styled.div`
  display: flex;
`;

const Header = styled.div`
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;
`;

const Brand = styled.h1`
  margin-top: 20px;
  font-size: 28px;
  color: #4a2882;
`;

const Logo = styled.img`
  height: 55px;
  margin: 12.5px;
`;

export default AppHeader;
