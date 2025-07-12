import { useState, useMemo, useRef} from "react";
import { motion } from "framer-motion";
import { FaComments, FaTasks, FaVideo, FaFileAlt, FaMobile, FaLock } from "react-icons/fa";
import "./FeaturesSection.css";
import teamChatImage from "../../../assets/images/team_chat.png";
import teamChatImageLight from "../../../assets/images/team_chat_light.png";
import managmentImage from "../../../assets/images/management.png";
import managementImageLight from "../../../assets/images/management_light.png";
import videoCallsImage from "../../../assets/images/calls.png";
import videoCallsImageLight from "../../../assets/images/calls_light.png";
import notesImage from "../../../assets/images/notes.png";
import notesImageLight from "../../../assets/images/notes_light.png";
import mobileImageLight from "../../../assets/images/mobile_light.png";
import mobileImage from "../../../assets/images/mobile.png";
import securityImageLight from "../../../assets/images/security_light.png";
import securityImage from "../../../assets/images/security.png";
import React from "react";

interface TabItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  image: string;
}

const FeaturesSection: React.FC<{ theme: 'light' | 'dark'}> = ({theme}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index);
    
    if (window.innerWidth <= 992 && tabContentRef.current) {
      setTimeout(() => {
        tabContentRef.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };
  
  const tabs = useMemo<TabItem[]>(() => [
    {
      title: "Team Chat",
      icon: <FaComments />,
      description: "Real-time messaging with threads, reactions, and file sharing.",
      details: "Organize conversations by projects, pin important messages, and search history instantly.",
      image: theme === "dark" ? teamChatImage : teamChatImageLight,
    },
    {
      title: "Management",
      icon: <FaTasks />,
      description: "Kanban boards, deadlines, and progress tracking.",
      details: "Create tasks with assignees, due dates, and custom statuses.",
      image: theme === "dark" ? managmentImage : managementImageLight,
    },
    {
      title: "Video Calls",
      icon: <FaVideo />,
      description: "HD video meetings with screen sharing and recording.",
      details: "Start instant meetings or schedule ahead. Share your screen and collaborate.",
      image: theme === "dark" ? videoCallsImage : videoCallsImageLight,
    },
    {
      title: "Shared Notes",
      icon: <FaFileAlt />,
      description: "Collaborative documents with rich editing.",
      details: "Create and edit documents together in real-time with version history.",
      image: theme === "dark" ? notesImage : notesImageLight,
    },
    {
      title: "Mobile App",
      icon: <FaMobile />,
      description: "Full functionality on iOS and Android.",
      details: "Stay connected on the go with push notifications and offline access.",
      image: theme === "dark" ? mobileImage : mobileImageLight,
    },
    {
      title: "Security",
      icon: <FaLock />,
      description: "Enterprise-grade data protection.",
      details: "End-to-end encryption, SSO, 2FA, and compliance with regulations.",
      image: theme === "dark" ? securityImage : securityImageLight,
    }
  ], [theme]);

  return (
    <motion.section 
      className="features-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            staggerChildren: 0.2
          }
        },
        hidden: { 
          opacity: 0, 
          y: 50,
          transition: {
            duration: 0.5
          }
        }
      }}
    >
      <div className="features-container">
        <motion.div
          className="features-tabs"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
        >
          <div className="tab-buttons">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <div className="tab-icon">{tab.icon}</div>
                <div className="tab-title">{tab.title}</div>
              </button>
            ))}
          </div>

          <motion.div
            className="tab-content"
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            ref={tabContentRef}
          >
            <div className="tab-text">
              <h3>{tabs[activeTab].title}</h3>
              <p className="tab-description">{tabs[activeTab].description}</p>
              <p className="tab-details">{tabs[activeTab].details}</p>
            </div>
            <div className="tab-visual">
                <motion.div
                className="visual-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                <div className="visual-frame">
                    <img 
                    src={tabs[activeTab].image} 
                    alt={tabs[activeTab].title} 
                    className="feature-image"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    />
                </div>
                </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="features-header"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>No more switching between apps. TeamDesk combines all essential tools with seamless workflows.</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(FeaturesSection);