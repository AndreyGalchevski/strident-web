import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AddIcon from "./icons/Add";

const FixedActionButton = styled.div({
  position: "fixed",
  right: 23,
  bottom: 50,
  paddingTop: 15,
  marginBottom: 0,
  zIndex: 997,
});

const RoundButton = styled.div(({ theme: { colors } }) => ({
  width: 56,
  height: 56,
  fontSize: 16,
  borderRadius: 50,
  backgroundColor: colors.red,
}));

export interface Props {
  url: string;
}

const Fab: FunctionComponent<Props> = ({ url }) => (
  <FixedActionButton>
    <RoundButton>
      <Link to={url}>
        <AddIcon style={{ marginTop: 16 }} />
      </Link>
    </RoundButton>
  </FixedActionButton>
);

export default Fab;
