import React from 'react';
import { useNavigate } from 'react-router-dom';
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

          {/* Mac / iMac SVG Illustration */}
          <div className={styles.macContainer}>
            <svg width="360" height="176" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_26905_86)">
                <path d="M6.41784 0C2.8733 0 0 2.87903 0 6.43046V240.821C0 244.372 2.8733 247.251 6.41784 247.251H353.302C356.847 247.251 359.72 244.372 359.72 240.821V6.43046C359.72 2.87903 356.847 0 353.302 0H6.41784Z" fill="url(#paint0_linear_26905_86)" />
                <path d="M191.451 66.3851C191.451 69.1751 190.452 71.78 188.461 74.1909C186.058 77.0572 183.152 78.7134 180.001 78.4521C179.961 78.1175 179.937 77.7652 179.937 77.3949C179.937 74.7168 181.08 71.8504 183.109 69.5069C184.122 68.3203 185.41 67.3338 186.973 66.5467C188.532 65.7713 190.006 65.3425 191.393 65.2692C191.411 65.4351 191.425 65.6009 191.434 65.7664C191.445 65.9733 191.451 66.1797 191.451 66.3851Z" fill="url(#paint1_linear_26905_86)" />
                <path d="M201.999 108.742C201.172 110.691 200.194 112.485 199.06 114.134C197.515 116.383 196.249 117.939 195.274 118.803C193.762 120.222 192.142 120.949 190.408 120.99C189.163 120.99 187.661 120.628 185.913 119.895C184.159 119.165 182.548 118.803 181.074 118.803C179.529 118.803 177.871 119.165 176.098 119.895C174.322 120.628 172.892 121.011 171.798 121.049C170.135 121.121 168.477 120.374 166.822 118.803C165.766 117.863 164.445 116.252 162.862 113.969C161.164 111.531 159.768 108.704 158.675 105.481C157.503 102 156.916 98.6288 156.916 95.3651C156.916 91.6267 157.708 88.4023 159.294 85.7004C160.54 83.5299 162.198 81.818 164.273 80.5612C166.348 79.3043 168.59 78.6639 171.004 78.6229C172.325 78.6229 174.058 79.0399 176.21 79.8593C178.357 80.6816 179.736 81.0985 180.34 81.0985C180.792 81.0985 182.323 80.6111 184.919 79.6389C187.374 78.7376 189.446 78.3643 191.144 78.5113C195.743 78.89 199.198 80.7401 201.496 84.0735C197.383 86.6167 195.348 90.1788 195.389 94.7484C195.426 98.3079 196.691 101.27 199.178 103.622C200.305 104.713 201.564 105.557 202.964 106.156C202.661 107.055 202.34 107.916 201.999 108.742Z" fill="url(#paint2_linear_26905_86)" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_26905_86" x1="179.86" y1="0" x2="179.86" y2="247.251" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-mac-start)" />
                  <stop offset="1" stopColor="var(--current-mac-end)" />
                </linearGradient>
                <linearGradient id="paint1_linear_26905_86" x1="179.94" y1="65.2692" x2="179.94" y2="121.053" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-hero-bg)" />
                  <stop offset="1" stopColor="var(--current-hero-bg)" />
                </linearGradient>
                <linearGradient id="paint2_linear_26905_86" x1="179.94" y1="65.2692" x2="179.94" y2="121.053" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-hero-bg)" />
                  <stop offset="1" stopColor="var(--current-hero-bg)" />
                </linearGradient>
                <clipPath id="clip0_26905_86">
                  <rect width="359.72" height="304" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
