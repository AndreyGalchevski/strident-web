import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

const useScrollDirection = (): ScrollDirection => {
  const [currentScrollY, setCurrentScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    function handleScroll() {
      setCurrentScrollY(window.scrollY);
      const scrollingDown = window.scrollY > currentScrollY;
      setScrollDirection(scrollingDown ? "down" : "up");
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScrollY]);

  return scrollDirection;
};

export default useScrollDirection;
