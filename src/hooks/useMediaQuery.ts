import { useEffect, useState } from "react";

import theme from "../utils/theme";

const useMediaQuery = (
  query = `(max-width: ${theme.breakpoints.mobile})`
): boolean => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): void => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return (): void => mediaMatch.addEventListener("change", handler);
  }, [mediaMatch]);

  return matches;
};

export default useMediaQuery;
