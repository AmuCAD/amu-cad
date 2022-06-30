import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/shared/Button";

function HomePage() {
  return (
    <>
      <Slogan>웹에서 누구나 간편한 3D 디자인</Slogan>
      <Link to={"/edit"}>
        <StartButton>지금 시작하기</StartButton>
      </Link>
    </>
  );
}

const Slogan = styled.p`
  margin-top: 400px;
  color: #4A2882;
  font-size: 40px;
  text-align: center;
`;

const StartButton = styled(Button)`
  display: block;
  margin: 170px auto 0px;
`;

export default HomePage;
