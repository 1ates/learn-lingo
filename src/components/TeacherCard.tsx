import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { ref, set } from 'firebase/database';

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
  const { user, currentTheme } = useAuth();
  const themeAccentColors: Record<string, string> = {
    yellow: '#F4C550',
    green: '#9FBAAE',
    blue: '#9FB7CE',
    salmon: '#E0A39A',
    peach: '#F0AA8D',
    light: '#F4C550',
    navy: '#38CD3E',
    red: '#E30A17',
    orange: '#FF7A00',
  };
  const accentColor = themeAccentColors[currentTheme] || '#F4C550';
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const lessonsDone = teacher.lessonsDone ?? teacher.lessons_done ?? 0;
  const pricePerHour = teacher.pricePerHour ?? teacher.price_per_hour ?? 30;
  const avatarUrl = teacher.avatarUrl ?? teacher.avatar_url ?? 'https://ftp.goit.study/img/avatars/1.jpg';
  const formattedRating = Number(teacher.rating || 4.8).toFixed(1);

  const isOnline = teacher.isOnline ?? teacher.online ?? (!teacher.gender || teacher.gender === 'female' || ['Jane', 'Maria', 'Sarah', 'Julia', 'Emma'].some(n => teacher.name.includes(n)));

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('learn_lingo_favorites') || '[]');
    setIsFavorite(favorites.includes(teacher.id));
  }, [teacher.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('learn_lingo_favorites') || '[]');
    let updated;
    if (isFavorite) {
      updated = favorites.filter((id: string) => id !== teacher.id);
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
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '24px',
      gap: '48px',
      position: 'relative',
      width: '100%',
      maxWidth: '1184px',
      background: '#FFFFFF',
      borderRadius: '24px',
      margin: '0 auto 32px auto',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      boxSizing: 'border-box',
      fontFamily: "'Roboto', sans-serif"
    }}>
      {/* Avatar Container with perfect centering */}
      <div style={{
        boxSizing: 'border-box',
        width: '120px',
        height: '120px',
        background: '#FFFFFF',
        border: '3px solid #FBE9BA',
        borderRadius: '100px',
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={avatarUrl}
          alt={`${teacher.name} ${teacher.surname}`}
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '100px',
            objectFit: 'cover'
          }}
        />
        {isOnline && (
          <div style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            left: '85px',
            top: '19px',
            background: '#FFFFFF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#38CD3E',
              borderRadius: '50%'
            }}></div>
          </div>
        )}
      </div>

      {/* Content blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'normal', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#8A8A89' }}>
              Languages
            </span>
            <h3 style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'normal', fontWeight: 500, fontSize: '24px', lineHeight: '24px', color: '#121417', margin: 0 }}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="book" size={16} />
              <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#121417' }}>
                Lessons online {lessonsDone}
              </span>
            </div>

            <div style={{ width: '1px', height: '16px', background: 'rgba(18, 20, 23, 0.2)' }}></div>

            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#121417' }}>
              Lessons done: {lessonsDone}
            </span>

            <div style={{ width: '1px', height: '16px', background: 'rgba(18, 20, 23, 0.2)' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC531" stroke="#FFC531" strokeWidth="1.2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#121417' }}>
                Rating: {formattedRating}
              </span>
            </div>

            <div style={{ width: '1px', height: '16px', background: 'rgba(18, 20, 23, 0.2)' }}></div>

            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#121417' }}>
              Price / 1 hour: <strong style={{ color: '#38CD3E' }}>{pricePerHour}$</strong>
            </span>

            <button
              onClick={toggleFavorite}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill={isFavorite ? accentColor : 'none'} stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Languages tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {teacher.languages?.map(lang => (
            <span key={lang} style={{ background: '#F8F9FA', padding: '4px 12px', borderRadius: '35px', fontSize: '14px', color: '#121417', fontWeight: 500 }}>
              {lang}
            </span>
          ))}
        </div>

        {/* Info text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#8A8A89' }}>
            Speaks: <span style={{ textDecoration: 'underline', color: '#121417' }}>{teacher.languages?.join(', ')}</span>
          </span>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#8A8A89' }}>
            Lesson Info: {teacher.lesson_info || teacher.bio || 'Lessons are structured to cover grammar, vocabulary, and practical usage of the language.'}
          </span>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#8A8A89' }}>
            Conditions: {teacher.conditions ? teacher.conditions.join('. ') : 'Welcomes both adult learners and teenagers (13 years and above). Provides personalized study plans'}
          </span>
        </div>

        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            style={{ background: 'none', border: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', textDecorationLine: 'underline', color: '#121417', cursor: 'pointer', padding: 0 }}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', marginTop: '16px' }}>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#121417', margin: 0 }}>
              {teacher.experience || teacher.bio || 'Experienced professional teacher with a proven track record of student success.'}
            </p>

            {/* Reviews Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
              {teacher.reviews && teacher.reviews.length > 0 ? (
                teacher.reviews.map((rev, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '100px', background: '#FBE9BA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#121417' }}>
                        {(rev.reviewerName || rev.reviewer_name || 'S')[0]}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#8A8A89' }}>
                          {rev.reviewerName || rev.reviewer_name || 'Student'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC531" stroke="#FFC531" strokeWidth="1.2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '14px', color: '#121417' }}>
                            {Number(rev.rating || rev.reviewer_rating || 5).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#121417', margin: 0 }}>
                      {rev.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: '#8A8A89' }}>No reviews yet.</p>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              style={{ background: 'none', border: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', textDecorationLine: 'underline', color: '#121417', cursor: 'pointer', padding: 0, width: 'fit-content' }}
            >
              Show less
            </button>
          </div>
        )}

        {/* Levels */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {teacher.levels?.map((level, i) => {
            const isLast = i === (teacher.levels.length - 1);
            return (
              <span
                key={level}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '8px 12px',
                  gap: '4px',
                  background: isLast ? accentColor : 'transparent',
                  border: isLast ? 'none' : '1px solid rgba(18, 20, 23, 0.2)',
                  borderRadius: '35px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#121417'
                }}
              >
                {level}
              </span>
            );
          })}
        </div>

        {/* Main button */}
        {isExpanded && (
          <button
            onClick={() => onBook(teacher)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 48px',
              background: accentColor,
              borderRadius: '12px',
              border: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#121417',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </div>
  );
};
