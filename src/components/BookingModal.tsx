import React, { useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Teacher } from './TeacherCard';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ teacher, isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !teacher) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('Please sign in to book a lesson.');
      return;
    }
    if (!date || !time) {
      setError('Please select both date and time.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        teacherId: teacher.id,
        teacherName: `${teacher.name} ${teacher.surname}`,
        date,
        time,
        hours,
        totalPrice: hours * teacher.pricePerHour,
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to book lesson.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
        <h2>Book a Lesson with {teacher.name} {teacher.surname}</h2>
        <p className={styles.priceInfo}>Rate: ${teacher.pricePerHour} / hour</p>

        {success ? (
          <div className={styles.successMessage}>
            🎉 Lesson successfully booked! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleBooking} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label>Duration (Hours)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.total}>
              Total: ${hours * teacher.pricePerHour}
            </div>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
