import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import useModal from "../../../hooks/useModal";
import useStore from "../../../store";
import IconButton from "../../common/shared/IconButton";

import unionIcon from "../../../assets/icons/union.png";
import subtractIcon from "../../../assets/icons/subtract.png";
import directionIcon from "../../../assets/icons/direction.png";

function ExtrudeModal() {
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const [operationType, setOperationType] = useStore(state => [
    state.operationType,
    state.setOperationType,
  ]);
  const setExtrudeSize = useStore(state => state.setExtrudeSize);
  const setIsForwardDirection = useStore(state => state.setIsForwardDirection);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setIsConfirm = useStore(state => state.setIsConfirm);
  const operationShapes = useStore(state => state.operationShapes);

  const { hideModal } = useModal();

  return (
    <>
      {(activeFunction === "EXTRUDE" ||
        (activeFunction === "REVOLVE" &&
          !baseCoordinate.hasOwnProperty("y"))) &&
        operationShapes && (
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
            <Flex>
              <OperationSelectButton
                onClick={() => {
                  setOperationType("SUBTRACT");
                }}
                isActive={operationType === "SUBTRACT"}
              >
                <img src={subtractIcon} alt="이미지 없음" width="80" />
              </OperationSelectButton>
              <OperationSelectButton
                onClick={() => {
                  setOperationType("UNION");
                }}
                isActive={operationType === "UNION"}
              >
                <img src={unionIcon} alt="이미지 없음" width="80" />
              </OperationSelectButton>
            </Flex>
            <form>
              <Flex>
                <Field>
                  {activeFunction === "EXTRUDE" ? "치수" : "반지름"}
                </Field>
                <SizeInput
                  type="number"
                  defaultValue="0"
                  min="0"
                  max="1000"
                  onChange={e => {
                    setExtrudeSize(e.target.value / 10);
                  }}
                ></SizeInput>
                {activeFunction === "EXTRUDE" && (
                  <DirectionChangeButton
                    onClick={e => {
                      e.preventDefault();
                      setIsForwardDirection();
                    }}
                  >
                    <img src={directionIcon} alt="이미지 없음" width="40" />
                  </DirectionChangeButton>
                )}
              </Flex>
              <ConfirmButton
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  hideModal();
                  setIsConfirm(true);
                }}
                value="확인"
              ></ConfirmButton>
            </form>
          </ModalContainer>
        )}
    </>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 330px;
  right: 270px;
  width: 300px;
  height: 250px;
  text-align: center;
  border: 1px solid #737373;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const OperationSelectButton = styled(IconButton)`
  margin: 15px 5px 0px 5px;
`;

const DirectionChangeButton = styled(IconButton)`
  margin-top: 20px;
  margin-left: 5px;
`;

const Field = styled.p`
  margin-top: 21px;
  padding-top: 10px;
  padding-right: 7px;
  font-size: 15px;
`;

const SizeInput = styled.input`
  width: 150px;
  height: 40px;
  margin-top: 22px;
  border: 1px solid #737373;
  border-radius: 7px;
  font-size: 17px;
`;

const ConfirmButton = styled.input`
  display: block;
  width: 82px;
  height: 30px;
  border: 0;
  border-radius: 4px;
  margin: 25px auto;
  background-color: #4a2882;
  font-size: 15px;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default ExtrudeModal;
