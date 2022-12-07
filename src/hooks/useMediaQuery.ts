import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): void => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return (): void => mediaMatch.removeListener(handler);
  });

  return matches;
};

export default useMediaQuery;
