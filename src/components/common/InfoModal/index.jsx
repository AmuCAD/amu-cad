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
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 30px;
  width: 400px;
  height: 130px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 3px;
  z-index: 1000;
`;

export default InfoModal;
