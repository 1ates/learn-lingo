import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import styles from './BookTrialModal.module.css';
import { db, auth } from '../services/firebase';
import { ref, push, set } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

interface TeacherInfo {
  name: string;
  surname: string;
  avatarUrl?: string;
  avatar_url?: string;
}

interface BookTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: TeacherInfo;
}

const trialSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  reason: yup.string().required('Please select a reason'),
}).required();

export const BookTrialModal: React.FC<BookTrialModalProps> = ({ isOpen, onClose, teacher }) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    resolver: yupResolver(trialSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        if (user.displayName) setValue('fullName', user.displayName);
        if (user.email) setValue('email', user.email);
      }
    }
  }, [isOpen, user, setValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    try {
      const bookingsRef = ref(db, 'bookings');
      const newBookingRef = push(bookingsRef);
      await set(newBookingRef, {
        teacherName: teacher ? `${teacher.name} ${teacher.surname}` : 'General Teacher',
        userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
        ...data,
        bookedAt: new Date().toISOString(),
      });
      toast.success('Trial lesson booked successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error booking trial lesson:', error);
      toast.error('Failed to book trial lesson. Please try again.');
    }
  };

  const avatarUrl = teacher?.avatarUrl || teacher?.avatar_url || 'https://ftp.goit.study/img/avatars/1.jpg';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        <h2 className={styles.title}>Book trial lesson</h2>
        <p className={styles.subtitle}>
          Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your needs.
        </p>

        {teacher && (
          <div className={styles.teacherCard}>
            <img src={avatarUrl} alt={`${teacher.name} ${teacher.surname}`} className={styles.teacherAvatar} />
            <div className={styles.teacherInfo}>
              <span className={styles.teacherSubtitle}>Your teacher</span>
              <strong className={styles.teacherName}>{teacher.name} {teacher.surname}</strong>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>What is your main reason for learning languages?</label>
            <div className={styles.options}>
              {[
                'Career and business',
                'Lesson for kids',
                'Exams and coursework',
                'Culture, travel or hobby'
              ].map((option) => (
                <label key={option} className={styles.option}>
                  <input
                    type="radio"
                    value={option}
                    {...register('reason')}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.reason && <span className={styles.errorText}>{errors.reason.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName')}
              className={styles.input}
            />
            {errors.fullName && <span className={styles.errorText}>{errors.fullName.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={styles.input}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message as string}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Phone number"
              {...register('phone')}
              className={styles.input}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone.message as string}</span>}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Book'}
          </button>
        </form>
      </div>
    </div>
  );
};
