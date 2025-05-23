import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoaderScreen from "./LoaderScreen";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  // Store scroll position for each route
  useEffect(() => {
    // Save current scroll position when leaving a page
    const currentPath = displayLocation.pathname;
    sessionStorage.setItem(
      `scrollPos-${currentPath}`,
      window.scrollY.toString()
    );

    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      setIsLoading(true);

      // After fadeOut completes, update the location
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");

        // Show loader briefly
        setTimeout(() => {
          setIsLoading(false);

          // Restore scroll position after content loads
          const nextPath = location.pathname;
          const savedScrollPos = sessionStorage.getItem(
            `scrollPos-${nextPath}`
          );

          if (savedScrollPos) {
            setTimeout(() => {
              window.scrollTo(0, parseInt(savedScrollPos));
            }, 100);
          } else {
            window.scrollTo(0, 0); // Default to top for new pages
          }
        }, 600);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  if (isLoading) {
    return <LoaderScreen />;
  }

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
