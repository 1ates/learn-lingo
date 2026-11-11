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
      <img src={teacher.avatarUrl} alt={`${teacher.name} ${teacher.surname}`} className={styles.avatar} />
      <div className={styles.content}>
        <h3 className={styles.name}>{teacher.name} {teacher.surname} ⭐️ {teacher.rating}</h3>
        <p className={styles.bio}>{teacher.bio}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${teacher.pricePerHour} / hr</span>
          <button onClick={() => onBook(teacher)} className={styles.bookBtn}>Book Lesson</button>
        </div>
      </div>
    </div>
  );
};
