import type React from "react";
import  { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/layouts/Header/Header";
import Footer from "../components/layouts/Footer/Footer";
import HeroSection from "../components/sections/HeroSection/HeroSection";
import OverviewSection from "../components/sections/OverviewSection/OverviewSection";


const Main: React.FC = () => {
  const { theme } = useTheme();
  const [showOverview, setShowOverview] = useState(false);
  return (
    <div className="main-container">
      <Header />
      <div className="main-content">
        <AnimatePresence mode="wait">
          {!showOverview && (
            <motion.div
              key="hero"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <HeroSection theme={theme} onStart={() => setShowOverview(true)} />
            </motion.div>
          )}

          {showOverview && (
            <motion.div
              key="overview"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }
            }
            >
              <OverviewSection theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer theme={theme} />
    </div>
  );
};

export default Main;