import { FunctionComponent, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useMediaQuery from "../hooks/useMediaQuery";
import { Card, CardContent, CardAction } from "../styled/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import useMutationLogin from "../hooks/mutations/useMutationLogin";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isLoading: loginLoading } = useMutationLogin();

  const navigate = useNavigate();

  const isMobile = useMediaQuery();

  const modal = useModal();

  const auth = useAuth();

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleLogin(): void {
    if (!email || !password) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: "Please fill out the required fields",
      });
      return;
    }

    login(
      { email, password },
      {
        onSuccess: () => {
          auth.authenticate();
          navigate("/");
        },
        onError: (e) => {
          modal.showModal({
            modalType: "ERROR",
            errorMessage: e.message,
          });
        },
      }
    );
  }

  return (
    <section>
      <h2>Login</h2>
      <Wrapper isMobile={isMobile}>
        <Card>
          <CardContent>
            <Input
              name="email"
              type="text"
              onChange={handleUsernameChange}
              value={email}
            />
            <Input
              name="password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </CardContent>
          <CardAction>
            <Button onClick={handleLogin} fullWidth>
              {loginLoading ? "Loading..." : "Sign in"}
            </Button>
          </CardAction>
        </Card>
      </Wrapper>
    </section>
  );
};

export default observer(Login);
