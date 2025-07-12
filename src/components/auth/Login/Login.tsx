import React, { useState } from 'react';
import './Login.css';
import logoDark from '../../../assets/icons/logo/logo_icon.svg';
import logoLight from '../../../assets/icons/logo/logo_icon_light.svg';
import { useTheme } from '../../../context/ThemeContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CustomButton from '../../ui/CustomButton/CustomButton';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const {theme} = useTheme()
  const logo = theme === 'light' ? logoDark : logoLight;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="login-container">
      <div className="login-content">
        <img src={logo} alt="Your Company" className="logo" />
        <h2 className="title">Log in to your account</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="label">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEye className="password-icon" /> : <FiEyeOff className="password-icon" />}
            </button>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <CustomButton type="submit" variant="primary" className="login-button">Log in</CustomButton>
        </form>

        <p className="register-link">
          Not a member? <Link to="/registration">Create account</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;