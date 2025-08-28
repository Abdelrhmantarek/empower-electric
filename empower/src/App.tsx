import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import CarDetail from "./pages/CarDetail";
import TestDrive from "./pages/TestDrive";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react"; // <-- Add this import

// Wrapper component for page transitions with enhanced animation
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const App = () => {
  // Disable right-click globally
  // useEffect(() => {
  //   const handleContextMenu = (e: MouseEvent) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PageTransitionWrapper>
                  <Index />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/inventory"
              element={
                <PageTransitionWrapper>
                  <Inventory />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/inventory/:id"
              element={
                <PageTransitionWrapper>
                  <CarDetail />
                </PageTransitionWrapper>
              }
            />
            {/* <Route
              path="/test-drive"
              element={
                <PageTransitionWrapper>
                  <TestDrive />
                </PageTransitionWrapper>
              }
            /> */}
            <Route
              path="/about"
              element={
                <PageTransitionWrapper>
                  <About />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransitionWrapper>
                  <Contact />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageTransitionWrapper>
                  <NotFound />
                </PageTransitionWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;