import styled from "styled-components";

const HalfwayTab = styled.a(({ theme: { colors } }) => ({
  position: "absolute",
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.white,
  right: 24,
  bottom: 174,
}));

export default HalfwayTab;
