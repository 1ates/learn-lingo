import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <img src="/logo.svg" alt="LearnLingo" />
          LearnLingo
        </a>
        <ul className={styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/teachers">Teachers</a></li>
        </ul>
        <div className={styles.navActions}>
          <a href="/login" className={styles.loginLink}>→ Log in</a>
          <button onClick={() => setIsModalOpen(true)} className={styles.registerBtn}>
            Registration
          </button>
        </div>
      </nav>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
