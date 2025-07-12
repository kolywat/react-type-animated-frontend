import { useState } from "react";
import "./Registration.css";
import logoDark from '../../../assets/icons/logo/logo_icon.svg';
import logoLight from '../../../assets/icons/logo/logo_icon_light.svg';
import { useTheme } from '../../../context/ThemeContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CustomButton from '../../ui/CustomButton/CustomButton';
import { Link } from "react-router-dom";

const RegistrationForm: React.FC = () =>  {
  const {theme} = useTheme()
  const logo = theme === 'light' ? logoDark : logoLight;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    console.log(payload);
  };

  return (
    <section className="register-container">
      <div className="register-content">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="title">Create an account</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEye className="password-icon" />
              ) : (
                <FiEyeOff className="password-icon" />
              )}
            </button>
          </div>

          <CustomButton type="submit" variant="primary" className="register-button">Registrate</CustomButton>
        </form>

        <p className="login-link">
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}

export default RegistrationForm;