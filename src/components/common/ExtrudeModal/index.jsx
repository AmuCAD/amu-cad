import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import useModal from "../../../hooks/useModal";
import useStore from "../../../store";

function ExtrudeModal() {
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setExtrudeSize = useStore(state => state.setExtrudeSize);
  const setIsConfirm = useStore(state => state.setIsConfirm);
  const operationShapes = useStore(state => state.operationShapes);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const [operationType, setOperationType] = useStore(state => [
    state.operationType,
    state.setOperationType,
  ]);
  const setIsForwardDirection = useStore(state => state.setIsForwardDirection);

  const { hideModal } = useModal();

  return (
    <>
      {(activeFunction === "EXTRUDE" ||
        (activeFunction === "REVOLVE" &&
          !baseCoordinate.hasOwnProperty("y"))) &&
        operationShapes && (
          <ModalOverlay
            onClick={() => {
              hideModal();
              setActiveFunction(null);
            }}
          >
            <ModalContainer
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <CloseButton
                onClick={() => {
                  hideModal();
                  setActiveFunction(null);
                }}
              />
              <div>
                <SelectButton
                  onClick={() => {
                    setOperationType("SUBTRACT");
                  }}
                >
                  {operationType === "SUBTRACT" ? "차집합(활)" : "차집합"}
                </SelectButton>
                <SelectButton
                  onClick={() => {
                    setOperationType("UNION");
                  }}
                >
                  {operationType === "UNION" ? "합집합(활)" : "합집합"}
                </SelectButton>
              </div>
              {activeFunction === "EXTRUDE" ? "치수" : "반지름"}
              <SizeInput
                type="number"
                onChange={e => {
                  setExtrudeSize(e.target.value);
                }}
              ></SizeInput>
              {activeFunction === "EXTRUDE" && (
                <button
                  onClick={() => {
                    setIsForwardDirection();
                  }}
                >
                  방향 전환
                </button>
              )}
              <ConfirmButton
                onClick={() => {
                  hideModal();
                  setIsConfirm(true);
                }}
              >
                확인
              </ConfirmButton>
            </ModalContainer>
          </ModalOverlay>
        )}
    </>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 330px;
  right: 270px;
  width: 350px;
  height: 250px;
  text-align: center;
  border: 1px solid #737373;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 6.57%;
  left: 90.6%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SelectButton = styled.button`
  width: 82px;
  height: 30px;
  border-radius: 4px;
  margin: 50px auto;
  border: 1px solid #4a2882;
  background-color: #ffff;
  font-size: 15px;
  color: #4a2882;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SizeInput = styled.input`
  width: 150px;
  height: 30px;
  font-size: 15px;
`;

const ConfirmButton = styled.button`
  display: block;
  width: 82px;
  height: 30px;
  border: 0;
  border-radius: 4px;
  margin: 50px auto;
  background-color: #4a2882;
  font-size: 15px;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default ExtrudeModal;
