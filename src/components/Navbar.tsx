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
        <a href="/" className={styles.logo}>LearnLingo 🎓</a>
        <ul className={styles.navLinks}>
          <li><a href="/">Find Tutors</a></li>
          <li><a href="/how-it-works">How It Works</a></li>
          <li>
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userEmail}>{user.email}</span>
                <button onClick={() => signOut()} className={styles.authBtn}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => setIsModalOpen(true)} className={styles.authBtn}>
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
