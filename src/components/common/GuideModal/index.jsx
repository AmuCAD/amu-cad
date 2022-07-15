import { useState } from "react";
import styled from "styled-components";
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import useModal from "../../../hooks/useModal";
import IconImg from "../shared/IconImg";
import guideData from "../../../assets/local-data/guideData.json";

function GuideModal() {
  const [pageNumber, setPageNumber] = useState(0);
  const { hideModal } = useModal();

  const renderGuideData = (data, category) =>
    data
      .filter(item => item.category === category)
      .map(item => (
        <Flex key={item.id}>
          <IconImg src={item.img} alt="이미지 없음" width="50px" />
          <Description>{item.description}</Description>
        </Flex>
      ));

  return (
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton
          onClick={() => {
            hideModal();
          }}
        />
        {pageNumber === 0 && (
          <>
            <Title>기본 조작</Title>
            {renderGuideData(guideData, "기본 조작")}
            <ForwardButton
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            />
          </>
        )}
        {pageNumber === 1 && (
          <>
            <Title>Model</Title>
            <BackButton
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            />

            {renderGuideData(guideData, "Model")}
            <ForwardButton
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            />
          </>
        )}
        {pageNumber === 2 && (
          <>
            <Title>Sketch</Title>
            <BackButton
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            />

            {renderGuideData(guideData, "Sketch")}
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 450px;
  padding: 20px 70px;
  border-radius: 20px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 5px;
  z-index: 999;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const BackButton = styled(IoIosArrowBack)`
  position: absolute;
  left: 15px;
  top: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ForwardButton = styled(IoIosArrowForward)`
  position: absolute;
  right: 15px;
  top: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: start;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
`;

const Description = styled.p`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
`;

export default GuideModal;
