import './Footer.css'
import WaveCanvas from '../../animations/WaveCanvas/WaveCanvas';

const Footer: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <WaveCanvas theme={theme}>
        <div className="footer-inner">
          <p>© 2025 TeamDesk. All rights reserved.</p>
        </div>
    </WaveCanvas>
  );
};

export default Footer;