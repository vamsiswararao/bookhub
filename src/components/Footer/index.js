import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="social-container">
    <div className="footer-social-container">
      <FaGoogle className="social" />
      <FaTwitter className="social" />
      <FaInstagram className="social" />
      <FaYoutube className="social" />
    </div>
    <div>
      <p className="footer-contact-us">Contact Us</p>
    </div>
  </div>
)

export default Footer
