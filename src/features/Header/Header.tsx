import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import * as S from "./Header.styles";
import { Login } from "./Login";
import AppBar from "@mui/material/AppBar";
import { AppContext, Types } from "../../state";

export const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  const { isLoggedIn } = state;
  const [showLogin, setShowLogin] = useState(false);

  const logoutHandler = () => {
    dispatch({ type: Types.SetIsLoggedIn, payload: { status: false } });
    dispatch({ type: Types.SetUser, payload: { user: "" } });
  };

  return (
    <>
      <AppBar position="sticky">
        <S.Toolbar>
          <h1>Forum Romanum</h1>
          {isLoggedIn ? (
            <Button color="inherit" onClick={() => logoutHandler()}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => setShowLogin(true)}>
              Login
            </Button>
          )}
        </S.Toolbar>
      </AppBar>
      <Login open={showLogin} closeLogin={() => setShowLogin(false)} />
    </>
  );
};
