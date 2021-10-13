import { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import * as S from "./Header.styles";

interface LoginI {
  open: boolean;
  closeLogin(): void;
}

export const Login = ({ open, closeLogin }: LoginI) => {
  const [signUp, setSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const loginHandler = () => {
    console.log("LOGIN BY", loginEmail);
  };
  const signUpHandler = () => {
    console.log("SIGN UP BY", signUpEmail);
  };

  return (
    <Modal
      open={open}
      onClose={closeLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.LoginContainer>
        <p>Login or sign up to contribute to the discussion!</p>
        {!signUp ? (
          <>
            <Input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus
            />
            <Input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
            />

            <Button onClick={() => loginHandler()}>Login</Button>
            <Link onClick={() => setSignUp(true)}>Or sign up</Link>
          </>
        ) : (
          <>
            <Input
              type="email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus
            />
            <Input
              type="password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              placeholder="Password"
            />

            <Button onClick={() => signUpHandler()}>Create account</Button>
            <Link onClick={() => setSignUp(false)}>Cancel</Link>
          </>
        )}
      </S.LoginContainer>
    </Modal>
  );
};
