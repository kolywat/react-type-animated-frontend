import { motion } from "framer-motion";
import Typewriter from "../../ui/TypewriterText/TypewriterText";
import "./OverviewSection.css";
import overviewImage from "../../../assets/images/overview_1.png";
import overviewImageLight from "../../../assets/images/overview_light.png";
import React, { useEffect, useState } from "react";
import CustomButton from "../../ui/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import BenefitsSection from "../BenefitsSection/BenefitsSection";

const OverviewSection: React.FC<{ theme: 'light' | 'dark'}> = ({theme}) => {
  const overviewImageSrc = theme === "dark" ? overviewImage : overviewImageLight;
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section className="overview-section">
      <div className="overview-container">

        <div className="overview-header">
          <motion.div
          className="overview-text-block"
          {...(isMobile ? {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            onViewportEnter: () => setIsInView(true),
            onViewportLeave: () => setIsInView(false)
          } : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            viewport: { margin: "-150px" },
            onViewportEnter: () => setIsInView(true),
            onViewportLeave: () => setIsInView(false)
            })}
          >
            <h2 className="typewrite-title">
              <Typewriter
                text="What is TeamDesk?"
                speed={60}
                delay={300}
                random={20}
                loop={false}
                cursor={true}
                play={isInView}
              />
            </h2>

            <p>
              <strong>TeamDesk</strong> is your all-in-one digital workspace for productive teams.
              Built for async and remote-first collaboration — without the chaos. <br />
              From task planning to voice chat, everything lives in one place.
            </p>
            <p>
              It’s where your tasks, messages, and notes stay synced and accessible,
              whether you're working from your laptop or your phone. <br />
              Never lose context, even across time zones or teams.
            </p>
          </motion.div>

          <motion.div
            className="overview-image-block"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ margin: "-100px" }}
          >
            <img src={overviewImageSrc} alt="TeamDesk Overview" loading="lazy"/>
          </motion.div>
        </div>

        <BenefitsSection/>

        <motion.p
          className="overview-outro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-50px" }}
        >
          TeamDesk is a structured digital co-working space where everyone stays
          in sync, engaged, and focused — no matter where they work from.
        </motion.p>

        <FeaturesSection theme={theme} />

        <motion.div
          className="overview-button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ margin: "-30px" }}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
        >
          <Link to="/registration">
          <CustomButton className="try-button" variant="primary">
            <Typewriter
                text="Try it now!"
                speed={60}
                delay={300}
                random={20}
                loop={false}
                cursor={false}
                play={isInView}
              />
            </CustomButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;