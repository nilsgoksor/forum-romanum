import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  position: fixed;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  background-color: #fff;
  border: 2px solid #000;
`;
