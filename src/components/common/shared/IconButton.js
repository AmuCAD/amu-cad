import styled from "styled-components";

const IconButton = styled.button`
  border: 0;
  filter: ${props =>
    props.isActive
      ? "invert(13%) sepia(89%) saturate(3391%) hue-rotate(305deg) brightness(98%) contrast(100%);"
      : "invert(13%) sepia(98%) saturate(1822%) hue-rotate(250deg) brightness(97%) contrast(93%);"}
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default IconButton;
