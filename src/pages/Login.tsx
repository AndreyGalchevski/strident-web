import { FunctionComponent, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "../hooks/useMediaQuery";
import { Card, CardContent, CardAction } from "../styled/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";
import useMutationLogin from "../hooks/mutations/useMutationLogin";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isLoading: loginLoading } = useMutationLogin();

  const navigate = useNavigate();

  const isMobile = useMediaQuery();

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleLogin(): void {
    if (!username || !password) {
      window.alert("Please fill out the required fields");
      return;
    }

    login(
      { username, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (e) => {
          window.alert(e.message);
        },
      }
    );
  }

  return (
    <>
      <Loader isLoading={loginLoading}>
        <section>
          <h2>Login</h2>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="username"
                  type="text"
                  onChange={handleUsernameChange}
                  value={username}
                />
                <Input
                  name="password"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </CardContent>
              <CardAction>
                <Button handleClick={handleLogin}>Login</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </section>
      </Loader>
    </>
  );
};

export default Login;
