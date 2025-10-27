import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook to manage responsive sidebar collapse state.
 * Automatically collapses below a specified breakpoint and provides manual toggle.
 *
 * @param breakpoint - The screen width (in px) below which the sidebar collapses. Default is 900.
 * @returns {object} { isCollapse, toggleCollapse, setIsCollapse }
 */
export function useResponsiveCollapse(breakpoint = 900) {
  const getInitialState = () =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : true;

  const [isCollapse, setIsCollapse] = useState<boolean>(getInitialState);

  // Toggles collapse manually
  const toggleCollapse = useCallback(() => {
    setIsCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Debounce resize for better performance
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsCollapse(window.innerWidth < breakpoint);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isCollapse, toggleCollapse, setIsCollapse } as const;
}
