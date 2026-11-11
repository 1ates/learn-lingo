import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.logo}>LearnLingo 🎓</span>
          <p>Connecting worlds through languages.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Platform</h4>
            <ul>
              <li><a href="/">Find Tutors</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4>Support</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} LearnLingo. All rights reserved.</p>
      </div>
    </footer>
  );
};
