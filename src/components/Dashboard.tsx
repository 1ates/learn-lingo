import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../context/AuthContext';
import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';

interface Booking {
  id: string;
  teacherName: string;
  date: string;
  time: string;
  hours: number;
  totalPrice: number;
  userId: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const bookingsRef = ref(db, 'bookings');
        const snapshot = await get(bookingsRef);
        const userBookings: Booking[] = [];
        if (snapshot.exists()) {
          const val = snapshot.val();
          Object.entries(val).forEach(([key, b]: [string, any]) => {
            if (b.userId === user.uid) {
              userBookings.push({
                id: key,
                ...b,
              });
            }
          });
        }
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <div className={styles.container}>Please sign in to view your dashboard.</div>;
  if (loading) return <div className={styles.container}>Loading your bookings...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      {bookings.length === 0 ? (
        <p className={styles.empty}>You have no upcoming lessons. Start learning today!</p>
      ) : (
        <div className={styles.bookingList}>
          {bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingItem}>
              <div className={styles.info}>
                <strong>{booking.teacherName}</strong>
                <span>{booking.date} at {booking.time}</span>
              </div>
              <div className={styles.details}>
                <span>{booking.hours} hour(s) • ${booking.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
