import { FunctionComponent, useState, ChangeEvent } from "react";
import styled from "styled-components";

import { useAuthContext } from "../context/authContext";
import useMediaQuery from "../hooks/useMediaQuery";
import { LOGIN_SUCCESS } from "../context/authActionTypes";
import { login } from "../api/utils";
import { Card, CardContent, CardAction } from "../styled/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [, dispatch] = useAuthContext();
  const isMobile = useMediaQuery();

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  async function handleLogin(): Promise<void> {
    setLoading(true);
    try {
      const token = await login({ username, password });
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      navigate("/");
    } catch (error) {
      window.alert((error as Error).message);
    }
    setLoading(false);
  }

  return (
    <>
      <Loader isLoading={isLoading}>
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
