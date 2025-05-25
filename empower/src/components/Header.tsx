import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./Layout";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "../../public/logo/logo.png";
import logoDark from "../../public/logo/logo-dark.png";

const translations = {
  en: {
    home: "Home",
    inventory: "Inventory",
    testDrive: "Book a Test Drive",
    about: "About Us",
    contact: "Contact"
  },
  ar: {
    home: "الرئيسية",
    inventory: "المعرض",
    testDrive: "حجز تجربة قيادة",
    about: "من نحن",
    contact: "اتصل بنا"
  }
};

interface HeaderProps {
  transparentHeader?: boolean;
}

export default function Header({ transparentHeader = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track theme
  const location = useLocation();
  const { language } = useLanguage();

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Use MutationObserver to detect changes to the classList
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: translations[language].home, path: "/" },
    { name: translations[language].inventory, path: "/inventory" },
    { name: translations[language].testDrive, path: "/test-drive" },
    { name: translations[language].about, path: "/about" },
    { name: translations[language].contact, path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Animation variants for navigation menu
  const containerVariants = {
   喉: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !transparentHeader
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Updated Logo */}
          <Link to="/" className="flex items-center z-10">
            <motion.img
              src={isDarkMode ? logoDark : logoWhite} // Switch logo based on theme
              alt="EmpowerEV Logo"
              className="h-40 w-50 mt-4" // Adjust size as needed
              variants={logoVariants}
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex mx-auto">
            <NavigationMenuList className="gap-3">
              {navLinks.map((link, index) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <NavigationMenuItem>
                    <Link
                      to={link.path}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
                        isActive(link.path)
                          ? "text-ev-blue dark:text-ev-accent font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-ev-accent after:rounded-full"
                          : "text-foreground/80 hover:text-ev-blue dark:hover:text-ev-accent"
                      )}
                    >
                      {link.name}
                      {!isActive(link.path) && (
                        <motion.span
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-ev-accent scale-x-0 origin-left rounded-full"
                          initial={false}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </NavigationMenuItem>
                </motion.div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <motion.div
            className="flex items-center space-x-4 rtl:space-x-reverse"
            variants={itemVariants}
          >
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden bg-background dark:bg-card py-4 px-6 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-ev-blue dark:text-ev-accent"
                        : "text-foreground/80"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}