import styled from "styled-components";
import useModal from "../../../hooks/useModal";

function InfoModal({ children }) {
  const { hideModal } = useModal();

  return (
    <ModalContainer
      onClick={e => {
        e.stopPropagation();
        hideModal();
      }}
    >
      <Content>{children}</Content>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 3px;
  z-index: 1000;
`;

const Content = styled.p`
  margin: 0;
  text-align: left;
  font-size: 17px;
  white-space: pre-wrap;
`;

export default InfoModal;
