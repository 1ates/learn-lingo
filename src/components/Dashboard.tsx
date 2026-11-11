import React from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  teacherName: string;
  date: string;
  time: string;
  hours: number;
  totalPrice: number;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(bookingsData);
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
