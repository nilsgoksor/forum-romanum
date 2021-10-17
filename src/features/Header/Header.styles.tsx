import styled from "styled-components";
import { Toolbar as MaterialToolbar } from "@mui/material";

export const Toolbar = styled(MaterialToolbar)`
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
  height: 200px;
  position: fixed;
  top: calc(50% - 100px);
  left: calc(50% - 200px);
  background-color: #fff;
  border: 2px solid #000;
`;
