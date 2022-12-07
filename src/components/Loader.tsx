import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  FlexDirectionProperty: "column",
  height: "70%",
});

export interface Props {
  isLoading: boolean;
}

const Loader: FunctionComponent<PropsWithChildren<Props>> = ({
  isLoading,
  children,
}) => {
  return isLoading ? <Container>Loading...</Container> : <>{children}</>;
};

export default Loader;
