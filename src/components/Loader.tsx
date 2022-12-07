import {
  FunctionComponent,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import styled from "@emotion/styled";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  FlexDirectionProperty: "column",
  height: "70%",
});

const SpinnerImage = styled.img({
  width: "70%",
});

export interface Props {
  isLoading: boolean;
}

// @ts-ignore
const Loader: FunctionComponent<PropsWithChildren<Props>> = ({
  isLoading,
  children,
}) => {
  const [shouldDisplayLoading, setDisplayLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayLoading(false);
    }, 500);
  }, []);

  return isLoading || shouldDisplayLoading ? (
    <Container>
      <picture>
        <source
          srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751521/strident/app/strident_rat_ng.webp"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751421/strident/app/strident_rat.gif"
          type="image/jpeg"
        />
        <SpinnerImage
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751421/strident/app/strident_rat.gif"
          alt=""
        />
      </picture>
    </Container>
  ) : (
    children
  );
};

export default Loader;
