import { useState } from "react";
import Button from "@mui/material/Button";
import * as S from "./Header.styles";
import { Login } from "./Login";
import TheaterIcon from "@mui/icons-material/TheaterComedy";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <S.Header>
      <TheaterIcon />
      <h1>Forum Romanum</h1>
      <Button onClick={() => setShowLogin(true)}>login</Button>
      <Login open={showLogin} closeLogin={() => setShowLogin(false)} />
    </S.Header>
  );
};
