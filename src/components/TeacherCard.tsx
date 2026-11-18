import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { ref, set } from 'firebase/database';
import styles from './TeacherCard.module.css';

export interface Review {
  reviewerName?: string;
  reviewer_name?: string;
  rating?: number;
  reviewer_rating?: number;
  comment: string;
  reviewer_avatar?: string;
  avatar?: string;
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  lessonsDone?: number;
  lessons_done?: number;
  pricePerHour?: number;
  price_per_hour?: number;
  avatarUrl?: string;
  avatar_url?: string;
  lesson_info?: string;
  conditions?: string[];
  bio?: string;
  experience?: string;
  reviews?: Review[];
  isOnline?: boolean;
  online?: boolean;
  gender?: string;
}

interface TeacherCardProps {
  teacher: Teacher;
  onBook: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onBook }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const lessonsDone = teacher.lessonsDone ?? teacher.lessons_done ?? 0;
  const pricePerHour = teacher.pricePerHour ?? teacher.price_per_hour ?? 30;
  const avatarUrl = teacher.avatarUrl ?? teacher.avatar_url ?? 'https://ftp.goit.study/img/avatars/1.jpg';
  const formattedRating = Number(teacher.rating || 4.8).toFixed(1);

  const isOnline = teacher.isOnline ?? teacher.online ?? (!teacher.gender || teacher.gender === 'female' || ['Jane', 'Maria', 'Sarah', 'Julia', 'Emma'].some(n => teacher.name.includes(n)));

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('learn_lingo_favorites') || '[]');
    setIsFavorite(favorites.some((id: string) => String(id) === String(teacher.id)));
  }, [teacher.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('learn_lingo_favorites') || '[]');
    let updated;
    if (isFavorite) {
      updated = favorites.filter((id: string) => String(id) !== String(teacher.id));
    } else {
      updated = [...favorites, teacher.id];
    }
    localStorage.setItem('learn_lingo_favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);

    if (user) {
      try {
        await set(ref(db, `users/${user.uid}/favorites`), updated);
      } catch (err) {
        console.log("Could not update favorites in RTDB:", err);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img
          src={avatarUrl}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatarImage}
        />
        {isOnline && (
          <div className={styles.onlineBadge}>
            <div className={styles.onlineDot}></div>
          </div>
        )}
      </div>

      <div className={styles.infoColumn}>
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <span className={styles.languagesLabel}>Languages</span>
            <h3 className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div className={styles.metaGroup}>
            <div className={styles.metaItem}>
              <Icon name="book" size={16} />
              <span className={styles.metaText}>
                Lessons online {lessonsDone}
              </span>
            </div>

            <div className={styles.metaDivider}></div>

            <span className={styles.metaText}>
              Lessons done: {lessonsDone}
            </span>

            <div className={styles.metaDivider}></div>

            <div className={styles.metaItem}>
              <Icon name="star" size={16} color="#FFC531" />
              <span className={styles.metaText}>
                Rating: {formattedRating}
              </span>
            </div>

            <div className={styles.metaDivider}></div>

            <span className={styles.metaText}>
              Price / 1 hour: <strong className={styles.priceHighlight}>{pricePerHour}$</strong>
            </span>

            <button
              onClick={toggleFavorite}
              className={styles.favoriteBtn}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon
                name="heart"
                size={26}
                fill={isFavorite ? 'var(--current-accent, #F4C550)' : 'none'}
                stroke="#121417"
              />
            </button>
          </div>
        </div>

        <div className={styles.tagsRow}>
          {teacher.languages?.map(lang => (
            <span key={lang} className={styles.tag}>
              {lang}
            </span>
          ))}
        </div>

        <div className={styles.detailsList}>
          <span className={styles.detailsText}>
            Speaks: <span className={styles.detailsSubValue}>{teacher.languages?.join(', ')}</span>
          </span>
          <span className={styles.detailsText}>
            Lesson Info: {teacher.lesson_info || teacher.bio || 'Lessons are structured to cover grammar, vocabulary, and practical usage of the language.'}
          </span>
          <span className={styles.detailsText}>
            Conditions: {teacher.conditions ? teacher.conditions.join('. ') : 'Welcomes both adult learners and teenagers (13 years and above). Provides personalized study plans'}
          </span>
        </div>

        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={styles.linkBtn}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={styles.expandedSection}>
            <p className={styles.bioText}>
              {teacher.experience || teacher.bio || 'Experienced professional teacher with a proven track record of student success.'}
            </p>

            <div className={styles.reviewsContainer}>
              {teacher.reviews && teacher.reviews.length > 0 ? (
                teacher.reviews.map((rev, idx) => (
                  <div key={idx} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerAvatar}>
                        {(rev.reviewerName || rev.reviewer_name || 'S')[0]}
                      </div>
                      <div className={styles.reviewerInfo}>
                        <span className={styles.reviewerName}>
                          {rev.reviewerName || rev.reviewer_name || 'Student'}
                        </span>
                        <div className={styles.metaItem}>
                          <Icon name="star" size={16} color="#FFC531" />
                          <span className={styles.metaText}>
                            {Number(rev.rating || rev.reviewer_rating || 5).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>
                      {rev.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles.noReviews}>No reviews yet.</p>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className={styles.linkBtn}
            >
              Show less
            </button>
          </div>
        )}

        <div className={styles.levelsRow}>
          {teacher.levels?.map((level, i) => {
            const isLast = i === (teacher.levels.length - 1);
            return (
              <span
                key={level}
                className={`${styles.levelBadge} ${isLast ? styles.levelBadgeActive : ''}`}
              >
                {level}
              </span>
            );
          })}
        </div>

        {isExpanded && (
          <button
            onClick={() => onBook(teacher)}
            className={styles.bookTrialBtn}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </div>
  );
};
