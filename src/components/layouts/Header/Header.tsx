import { Link } from 'react-router-dom';
import CustomButton from '../../ui/CustomButton/CustomButton';
import logoDark from '../../../assets/icons/logo/logo_icon.svg'
import logoLight from '../../../assets/icons/logo/logo_icon_light.svg'
import { useTheme } from '../../../context/ThemeContext';
import './Header.css';
import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  const handleRegisterClick = () => {
  };
  const {theme} = useTheme()
  const logo = theme === 'light' ? logoDark : logoLight;

  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/" className="logo__link">
            <img src={logo} alt="Logo" />
            <span className="logo__text">TeamDesk</span>
            <ThemeToggle/>
          </Link>
        </div>
        <div className="header__auth">
          <div className="header__login">
            <Link to="/login">
              <CustomButton variant="default">Log in</CustomButton>
            </Link>
          </div>
          <div className="header__register">
            <Link to="/registration">
              <CustomButton variant="primary" onClick={handleRegisterClick}>
                Register
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;