import styles from './StatsBar.module.css';

export const StatsBar = () => {
  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <span className={styles.value}>32,000 +</span>
        <span className={styles.label}>Experienced tutors</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.value}>300,000 +</span>
        <span className={styles.label}>5-star tutor reviews</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.value}>120 +</span>
        <span className={styles.label}>Subjects taught</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.value}>200 +</span>
        <span className={styles.label}>Tutor nationalities</span>
      </div>
    </div>
  );
};
