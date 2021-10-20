import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import * as S from "./Header.styles";
import { AppContext, Types } from "../../state";
import axios from "axios";
import { UserI } from "../../model/user/User.interface";
import { MessageType } from "../../components/UserMessage";
import bcrypt from "bcryptjs";

interface LoginI {
  open: boolean;
  closeLogin(): void;
}

export const Login = ({ open, closeLogin }: LoginI) => {
  const { dispatch } = useContext(AppContext);

  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUser, setSignUpUser] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const loginHandler = () => {
    axios
      .get<UserI[]>(`http://localhost:1337/users?user=${user}`)
      .then((res) => {
        const resUser = res.data[0];
        if (typeof resUser !== "undefined") {
          const doesPasswordMatch = bcrypt.compareSync(
            password,
            res.data[0].password
          );
          if (doesPasswordMatch) {
            dispatch({ type: Types.SetIsLoggedIn, payload: { status: true } });
            dispatch({ type: Types.SetUser, payload: { user: user } });
            setUser("");
            setPassword("");
            closeLogin();
          } else {
            dispatch({
              type: Types.SetUserMessage,
              payload: {
                message: "Error logging in - Wrong password.",
                type: MessageType.ERROR,
              },
            });
          }
        } else {
          dispatch({
            type: Types.SetUserMessage,
            payload: {
              message: "Error logging in - Username does not exist.",
              type: MessageType.ERROR,
            },
          });
        }
      });
  };

  const signUpHandler = () => {
    const hashedPassword = bcrypt.hashSync(
      signUpPassword,
      bcrypt.genSaltSync()
    );

    const newUser = { user: signUpUser, password: hashedPassword };
    axios.post("http://localhost:1337/users", newUser).then(() => {
      dispatch({ type: Types.SetIsLoggedIn, payload: { status: true } });
      dispatch({ type: Types.SetUser, payload: { user: signUpUser } });
    });
    closeLogin();
  };

  return (
    <Modal
      open={open}
      onClose={closeLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.LoginContainer>
        {!signUp ? (
          <S.Form onSubmit={loginHandler}>
            <Input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <Button
              type="submit"
              disabled={user.length === 0 || password.length === 0}
              data-testid="login-modal-button"
            >
              Login
            </Button>
            <Link onClick={() => setSignUp(true)}>Or sign up</Link>
          </S.Form>
        ) : (
          <S.Form onSubmit={signUpHandler}>
            <Input
              type="text"
              value={signUpUser}
              onChange={(e) => setSignUpUser(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
            <Input
              type="password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              placeholder="Password"
            />

            <Button
              type="submit"
              disabled={signUpUser.length === 0 || signUpPassword.length === 0}
            >
              Create account
            </Button>
            <Link onClick={() => setSignUp(false)}>Cancel</Link>
          </S.Form>
        )}
      </S.LoginContainer>
    </Modal>
  );
};
