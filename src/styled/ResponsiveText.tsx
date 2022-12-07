import styled from '@emotion/styled';

const ResponsiveText = styled.p<{ isMobile: boolean }>(({ isMobile }) => ({
  marginTop: 0,
  fontSize: isMobile ? 18 : 24,
  lineHeight: 1.5,
}));

export default ResponsiveText;
