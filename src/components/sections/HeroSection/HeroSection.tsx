import AnimatedBackground from '../../animations/AnimatedBackground/AnimatedBackground';
import './HeroSection.css';
import CustomButton from '../../ui/CustomButton/CustomButton';
import { motion } from 'framer-motion';

const HeroSection: React.FC<{ theme: 'light' | 'dark'; onStart: () => void }> = ({ theme, onStart }) => {
  return (
    <AnimatedBackground theme={theme} className="hero-section">
      <div className="hero-content">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 0.3,
        }}
        >
          <h1>TeamDesk Workspace</h1>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 0.3,
        }}
        >
          <p>Workspaces for dreamers who deliver</p>
        </motion.div>
  
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 1.2,
        }}
        >
          <CustomButton variant="primary" onClick={onStart}>
            Find out more
          </CustomButton>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default HeroSection;