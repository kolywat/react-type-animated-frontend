import { motion } from "framer-motion";
import React from "react";
import {
  FaBrain,
  FaGlobe,
  FaToolbox,
  FaBullseye,
  FaLock,
  FaSlidersH,
} from "react-icons/fa";
import "./BenefitsSection.css"; 

const BenefitsSection: React.FC = () => {
  const cards = [
    {
      icon: <FaBrain />,
      title: "Productivity-first",
      text: "Organize tasks clearly. Prioritize what matters.",
    },
    {
      icon: <FaGlobe />,
      title: "Work from anywhere",
      text: "Fully browser-based — no installs or switching tabs.",
    },
    {
      icon: <FaToolbox />,
      title: "Built-in tools",
      text: "Chat, tasks, voice, notes — all in one place.",
    },
    {
      icon: <FaBullseye />,
      title: "For modern teams",
      text: "Perfect for startups, students, and distributed teams.",
    },
    {
      icon: <FaSlidersH />,
      title: "Customizable workflows",
      text: "Adapt to your team’s needs without extra tools.",
    },
    {
      icon: <FaLock />,
      title: "Privacy by default",
      text: "Your data is secure and only visible to your team.",
    },
  ];

  return (
    <motion.div
      className="overview-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {cards.map((item, index) => (
        <motion.div
          key={index}
          className="overview-card"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="card-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BenefitsSection;