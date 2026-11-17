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

          {/* Mac / iMac SVG Illustration from Mac.svg */}
          <div className={styles.macContainer}>
            <svg width="391" height="304" viewBox="0 0 391 304" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4_428)">
                <path d="M22.0579 0C18.5133 0 15.64 2.87903 15.64 6.43046V240.821C15.64 244.372 18.5133 247.251 22.0579 247.251H368.942C372.487 247.251 375.36 244.372 375.36 240.821V6.43046C375.36 2.87903 372.487 0 368.942 0H22.0579Z" fill="url(#paint0_linear_4_428)"/>
                <path d="M207.091 66.3851C207.091 69.1751 206.092 71.78 204.101 74.1909C201.698 77.0572 198.792 78.7134 195.641 78.4521C195.601 78.1175 195.577 77.7652 195.577 77.3949C195.577 74.7168 196.72 71.8504 198.749 69.5069C199.762 68.3203 201.05 67.3338 202.613 66.5467C204.172 65.7713 205.646 65.3425 207.033 65.2692C207.051 65.4351 207.065 65.6009 207.074 65.7664C207.085 65.9733 207.091 66.1797 207.091 66.3851Z" fill="url(#paint1_linear_4_428)"/>
                <path d="M217.639 108.742C216.812 110.691 215.834 112.485 214.7 114.134C213.155 116.383 211.889 117.939 210.914 118.803C209.402 120.222 207.782 120.949 206.048 120.99C204.803 120.99 203.301 120.628 201.553 119.895C199.799 119.165 198.188 118.803 196.714 118.803C195.169 118.803 193.511 119.165 191.738 119.895C189.962 120.628 188.532 121.011 187.438 121.049C185.775 121.121 184.117 120.374 182.462 118.803C181.406 117.863 180.085 116.252 178.502 113.969C176.804 111.531 175.408 108.704 174.315 105.481C173.143 102 172.556 98.6288 172.556 95.3651C172.556 91.6267 173.348 88.4023 174.934 85.7004C176.18 83.5299 177.838 81.818 179.913 80.5612C181.988 79.3043 184.23 78.6639 186.644 78.6229C187.965 78.6229 189.698 79.0399 191.85 79.8593C193.997 80.6816 195.376 81.0985 195.98 81.0985C196.432 81.0985 197.963 80.6111 200.559 79.6389C203.014 78.7376 205.086 78.3643 206.784 78.5113C211.383 78.89 214.838 80.7401 217.136 84.0735C213.023 86.6167 210.988 90.1788 211.029 94.7484C211.066 98.3079 212.331 101.27 214.818 103.622C215.945 104.713 217.204 105.557 218.604 106.156C218.301 107.055 217.98 107.916 217.639 108.742Z" fill="url(#paint2_linear_4_428)"/>
                <path d="M356.588 233.712C359.227 233.712 361.366 231.568 361.366 228.924C361.366 226.28 359.227 224.137 356.588 224.137C353.949 224.137 351.81 226.28 351.81 228.924C351.81 231.568 353.949 233.712 356.588 233.712ZM356.588 234.23C359.512 234.23 361.882 231.854 361.882 228.924C361.882 225.994 359.512 223.619 356.588 223.619C353.664 223.619 351.293 225.994 351.293 228.924C351.293 231.854 353.664 234.23 356.588 234.23Z" fillRule="evenodd" clipRule="evenodd" fill="#B97E35"/>
                <path d="M356.589 229.029C356.769 229.029 356.888 228.906 356.888 228.72V226.504C356.888 226.318 356.769 226.191 356.589 226.191C356.409 226.191 356.287 226.318 356.287 226.504V228.72C356.287 228.906 356.409 229.029 356.589 229.029ZM356.589 231.657C358.082 231.657 359.315 230.458 359.315 229.003C359.315 228.237 358.972 227.566 358.487 227.116C358.196 226.833 357.775 227.202 358.077 227.507C358.481 227.884 358.728 228.412 358.731 229.003C358.733 230.159 357.775 231.089 356.589 231.089C355.401 231.089 354.447 230.159 354.447 229.003C354.45 228.41 354.697 227.881 355.101 227.504C355.403 227.199 354.979 226.833 354.688 227.113C354.204 227.563 353.86 228.237 353.86 229.003C353.86 230.458 355.093 231.657 356.589 231.657Z" fill="var(--current-hero-bg)"/>
                <rect x="152.821" y="299.177" width="85.3573" height="1.28609" fill="#8C7447"/>
                <path d="M152.821 300.463H238.179V303.357C238.179 303.712 237.891 304 237.537 304H153.463C153.109 304 152.821 303.712 152.821 303.357V300.463Z" fill="#E2C999"/>
                <path d="M154.747 181.178C153.683 181.178 152.821 182.042 152.821 183.107V299.177H238.179V183.107C238.179 182.042 237.317 181.178 236.253 181.178H154.747ZM195.58 214.617C190.662 214.617 186.676 218.611 186.676 223.539V238.329C186.676 243.257 190.662 247.251 195.58 247.251C200.498 247.251 204.485 243.257 204.485 238.329V223.539C204.485 218.611 200.498 214.617 195.58 214.617Z" fillRule="evenodd" clipRule="evenodd" fill="url(#paint3_linear_4_428)"/>
                <ellipse cx="195.42" cy="231.095" rx="5.21451" ry="5.22476" fill="#535962"/>
                <ellipse cx="195.42" cy="231.095" rx="3.61004" ry="3.61714" fill="#121417"/>
                <ellipse cx="195.42" cy="231.095" rx="2.96826" ry="2.97408" fill="#9A9B9D"/>
                <ellipse cx="195.42" cy="231.095" rx="2.00559" ry="2.00948" fill="#121417"/>
                <path d="M68.9081 227.156C68.9081 226.446 69.4828 225.87 70.1916 225.87C70.9005 225.87 71.4752 226.446 71.4752 227.156V231.014C71.4752 231.725 70.9005 232.3 70.1916 232.3C69.4828 232.3 68.9081 231.725 68.9081 231.014V227.156Z" fill="#121417"/>
                <rect x="70.0312" y="227.156" width="0.32088" height="3.85827" rx="0.16044" fill="#D3933B"/>
                <path d="M78.6953 227.156C78.6953 226.446 79.27 225.87 79.9789 225.87C80.6878 225.87 81.2624 226.446 81.2624 227.156V231.014C81.2624 231.725 80.6878 232.3 79.9789 232.3C79.27 232.3 78.6953 231.725 78.6953 231.014V227.156Z" fill="#121417"/>
                <rect x="79.8185" y="227.156" width="0.320899" height="3.85827" rx="0.160449" fill="#D3933B"/>
                <path d="M88.4824 227.156C88.4824 226.446 89.0571 225.87 89.766 225.87C90.4749 225.87 91.0496 226.446 91.0496 227.156V231.014C91.0496 231.725 90.4749 232.3 89.766 232.3C89.0571 232.3 88.4824 231.725 88.4824 231.014V227.156Z" fill="#121417"/>
                <rect x="89.6056" y="227.156" width="0.320906" height="3.85827" rx="0.160453" fill="#D3933B"/>
                <path d="M98.2698 227.156C98.2698 226.446 98.8445 225.87 99.5533 225.87C100.262 225.87 100.837 226.446 100.837 227.156V231.014C100.837 231.725 100.262 232.3 99.5533 232.3C98.8445 232.3 98.2698 231.725 98.2698 231.014V227.156Z" fill="#121417"/>
                <rect x="99.3928" y="227.156" width="0.320891" height="3.85827" rx="0.160446" fill="#D3933B"/>
                <path d="M89.4929 223.898L89.5802 223.934C89.7753 223.759 90.0303 223.619 90.3452 223.513L90.412 223.348C90.2956 223.351 90.1878 223.362 90.0885 223.379C89.9927 223.393 89.9088 223.41 89.8369 223.43L90.566 221.681L89.3081 222.283L89.7291 220.94L89.5135 220.889L88.959 222.669L90.1501 222.108L89.6418 223.353C89.5768 223.223 89.4639 223.068 89.303 222.89L89.2362 223.055C89.3868 223.353 89.4724 223.634 89.4929 223.898Z" fill="var(--current-hero-bg)"/>
                <path d="M99.2802 223.898L99.3674 223.934C99.5625 223.759 99.8175 223.619 100.132 223.513L100.199 223.348C100.083 223.351 99.975 223.362 99.8757 223.379C99.7799 223.393 99.696 223.41 99.6242 223.43L100.353 221.681L99.0953 222.283L99.5163 220.94L99.3007 220.889L98.7462 222.669L99.9373 222.108L99.4291 223.353C99.364 223.223 99.2511 223.068 99.0902 222.89L99.0234 223.055C99.1741 223.353 99.2596 223.634 99.2802 223.898Z" fill="var(--current-hero-bg)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_4_428" x1="195.5" y1="0" x2="195.5" y2="247.251" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-mac-start)"/>
                  <stop offset="1" stopColor="var(--current-mac-end)"/>
                </linearGradient>
                <linearGradient id="paint1_linear_4_428" x1="195.58" y1="65.2692" x2="195.58" y2="121.053" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-hero-bg)"/>
                  <stop offset="1" stopColor="var(--current-hero-bg)"/>
                </linearGradient>
                <linearGradient id="paint2_linear_4_428" x1="195.58" y1="65.2692" x2="195.58" y2="121.053" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--current-hero-bg)"/>
                  <stop offset="1" stopColor="var(--current-hero-bg)"/>
                </linearGradient>
                <linearGradient id="paint3_linear_4_428" x1="195.5" y1="181.178" x2="195.5" y2="299.177" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EFD6A6"/>
                  <stop offset="1" stopColor="#CFB686"/>
                </linearGradient>
                <clipPath id="clip0_4_428">
                  <rect width="359.72" height="304" fill="white" transform="translate(15.64)"/>
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
