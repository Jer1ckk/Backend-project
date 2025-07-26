import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Follow Us Section */}
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/" className="social-link">
              <Facebook size={20} />
              <span>Facebook</span>
            </a>
            <a href="#" className="social-link">
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a href="#" className="social-link">
              <div className="tiktok-icon">♪</div>
              <span>TikTok</span>
            </a>
            <a href="#" className="social-link">
              <div className="telegram-icon">✈</div>
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Customer Services Section */}
        <div className="footer-section">
          <h3 className="footer-title">Customer Services</h3>
          <div className="service-links">
            <a href="#" className="service-link">
              <span className="service-icon">?</span>
              <span>Online exchange policy</span>
            </a>
            <a href="#" className="service-link">
              <span className="service-icon">🔒</span>
              <span>Privacy Policy</span>
            </a>
            <a href="#" className="service-link">
              <span className="service-icon">💬</span>
              <span>FAQs & guides</span>
            </a>
            <a href="#" className="service-link">
              <span className="service-icon">ℹ</span>
              <span>About Us</span>
            </a>
            <a href="#" className="service-link">
              <span className="service-icon">📍</span>
              <span>Find a store</span>
            </a>
          </div>
        </div>

        {/* We Accept Section */}
        <div className="footer-section">
          <h3 className="footer-title">We Accept</h3>
          <div className="payment-methods">
            <div className="payment-row">
              <div className="payment-card aba">ABA PAY</div>
              <div className="payment-card visa">VISA</div>
              <div className="payment-card mastercard">MC</div>
              <div className="payment-card unionpay">UnionPay</div>
              <div className="payment-card jcb">JCB</div>
            </div>
            <div className="payment-row">
              <div className="payment-method">
                <span className="bank-icon">🏦</span>
                <span>Bank Transfer</span>
              </div>
              <div className="payment-method">
                <span className="cash-icon">💰</span>
                <span>Cash on delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
