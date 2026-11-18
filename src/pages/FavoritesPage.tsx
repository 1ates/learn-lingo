import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';
import { TeacherCard, Teacher } from '../components/TeacherCard';
import { BookTrialModal } from '../components/BookTrialModal';
import { useAuth } from '../context/AuthContext';
import teachersFallback from '../data/teachers.json';
import styles from './FavoritesPage.module.css';

export const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        let favoriteIds: any[] = [];
        if (user) {
          try {
            const userSnap = await get(ref(db, `users/${user.uid}/favorites`));
            if (userSnap.exists() && Array.isArray(userSnap.val())) {
              favoriteIds = userSnap.val();
              localStorage.setItem('learn_lingo_favorites', JSON.stringify(favoriteIds));
            }
          } catch (e) {
            // fallback to local storage
          }
        }
        if (favoriteIds.length === 0) {
          favoriteIds = JSON.parse(localStorage.getItem('learn_lingo_favorites') || '[]');
        }

        if (favoriteIds.length === 0) {
          setTeachers([]);
          setLoading(false);
          return;
        }

        let allFetched: Teacher[] = [];
        try {
          const snapshot = await get(ref(db, 'teachers'));
          if (snapshot.exists()) {
            const val = snapshot.val();
            if (Array.isArray(val)) {
              allFetched = val.filter(Boolean).map((t: any, i: number) => ({
                ...t,
                id: t.id || `teacher-${i}`,
                lessonsDone: t.lessons_done || t.lessonsDone || 0,
              }));
            } else if (typeof val === 'object') {
              allFetched = Object.entries(val).map(([key, t]: [string, any]) => ({
                ...t,
                id: t.id || key,
                lessonsDone: t.lessons_done || t.lessonsDone || 0,
              }));
            }
          }
        } catch (e) {
          console.error("Error fetching teachers for favorites:", e);
        }

        if (allFetched.length === 0) {
          allFetched = teachersFallback.map((t: any, i: number) => ({
            ...t,
            id: t.id || `fallback-${i}`,
            lessonsDone: t.lessons_done || 0,
          }));
        }

        const favTeachers = allFetched.filter((t: any, i: number) =>
          favoriteIds.some((favId: any) =>
            String(favId) === String(t.id) ||
            String(favId) === String(i) ||
            String(favId) === String(t.name)
          )
        );
        setTeachers(favTeachers);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleBook = (teacher: Teacher) => {
    setSelectedTeacherForBooking(teacher);
    setIsBookingModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Favorite Teachers</h2>
      {loading ? (
        <p className={styles.message}>Loading favorites...</p>
      ) : teachers.length === 0 ? (
        <p className={styles.message}>You haven't added any favorite teachers yet.</p>
      ) : (
        <div>
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} onBook={handleBook} />
          ))}
        </div>
      )}

      <BookTrialModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teacher={selectedTeacherForBooking ? { name: selectedTeacherForBooking.name, surname: selectedTeacherForBooking.surname, avatarUrl: selectedTeacherForBooking.avatarUrl || selectedTeacherForBooking.avatar_url } : undefined}
      />
    </div>
  );
};
