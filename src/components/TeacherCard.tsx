import React from 'react';
import styles from './TeacherCard.module.css';

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  pricePerHour: number;
  avatarUrl: string;
  bio: string;
}

interface TeacherCardProps {
  teacher: Teacher;
  onBook: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onBook }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={teacher.avatarUrl} alt={`${teacher.name} ${teacher.surname}`} className={styles.avatar} />
        <div className={styles.ratingBadge}>⭐ {teacher.rating}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{teacher.name} {teacher.surname}</h3>
        <div className={styles.tags}>
          {teacher.languages.map(lang => <span key={lang} className={styles.tag}>{lang}</span>)}
        </div>
        <p className={styles.bio}>{teacher.bio}</p>
        <div className={styles.footer}>
          <div className={styles.priceTag}>
            <span className={styles.amount}>${teacher.pricePerHour}</span>
            <span className={styles.unit}>/hr</span>
          </div>
          <button onClick={() => onBook(teacher)} className={styles.bookBtn}>Book Now</button>
        </div>
      </div>
    </div>
  );
};
