import React from 'react';
import styles from './TeacherFilter.module.css';

interface TeacherFilterProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const TeacherFilter: React.FC<TeacherFilterProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedLevel,
  setSelectedLevel,
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="language-select" className={styles.label}>Language</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Chinese">Chinese</option>
          <option value="Mandarin">Mandarin</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="level-select" className={styles.label}>Level</label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className={styles.select}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};
