import { useTheme } from "../../../context/ThemeContext";
import lightIcon from '../../../assets/icons/options/light_theme.svg'
import darkIcon from '../../../assets/icons/options/dark_theme.svg'

export const ThemeToggle:React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const iconSrc = theme === 'dark' ? lightIcon : darkIcon;
  const glowColor = theme === 'dark' ? '#60A5FA' : '#4338ca';

  return (
    <div
      className="theme-icon-button"
      onClick={(e) => {
        e.preventDefault(); 
        toggleTheme();
      }}
      aria-label="Switch theme"
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      <img src={iconSrc} alt="Switch theme" />
    </div>
  );
};