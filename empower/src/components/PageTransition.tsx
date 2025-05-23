import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  // Navigation handler
  useEffect(() => {
    // Save current scroll position when leaving a page
    const currentPath = displayLocation.pathname;
    sessionStorage.setItem(
      `scrollPos-${currentPath}`,
      window.scrollY.toString()
    );

    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");

      // After fadeOut completes, update the location
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");

        // Always scroll to top on navigation
        window.scrollTo(0, 0);
      }, 300); // Fade-out duration

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        transitionStage === "fadeIn"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
