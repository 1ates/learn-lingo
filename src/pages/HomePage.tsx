import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.homeMain}>
      <section className={styles.heroSection}>
        <div className={styles.textColumn}>
          <h1 className={styles.title}>
            Unlock your potential with the best <span className={styles.highlight}>language</span> tutors
          </h1>
          <p className={styles.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            onClick={() => navigate('/teachers')}
            className={styles.getStartedBtn}
          >
            Get started
          </button>
        </div>
        <div className={styles.heroImageWrapper}>
          {/* Avatar Sticker */}
          <img
            src="/images/hero_1.png"
            srcSet="/images/hero@2x.png 2x"
            alt="Happy student with laptop"
            className={styles.avatarImg}
          />

          {/* Mac / iMac Illustration via Sprite Icon */}
          <div className={styles.macContainer}>
            <Icon name="mac" width={391} height={304} />
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>32,000 +</span>
          <span className={styles.statLabel}>Experienced tutors</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>300,000 +</span>
          <span className={styles.statLabel}>5-star tutor reviews</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>120 +</span>
          <span className={styles.statLabel}>Subjects taught</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>200 +</span>
          <span className={styles.statLabel}>Tutor nationalities</span>
        </div>
      </section>
    </main>
  );
};
