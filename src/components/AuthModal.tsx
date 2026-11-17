import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getSchema = (isSignUp: boolean) => {
  return yup.object({
    name: isSignUp ? yup.string().required('İsim zorunludur') : yup.string(),
    email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
    password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre zorunludur'),
  }).required();
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const { signIn, signUp } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(getSchema(isSignUp)),
  });

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

  const translateFirebaseError = (code: string) => {
    switch (code) {
      case 'auth/invalid-login-credentials':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'E-posta veya şifre hatalı.';
      case 'auth/invalid-email':
        return 'Geçersiz e-posta adresi.';
      case 'auth/email-already-in-use':
        return 'Bu e-posta adresi zaten kullanımda.';
      case 'auth/weak-password':
        return 'Şifre çok zayıf (en az 6 karakter olmalı).';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };

  const onSubmit = async (data: any) => {
    setAuthError('');
    try {
      if (isSignUp) {
        await signUp(data.email, data.password, data.name);
      } else {
        await signIn(data.email, data.password);
      }
      reset();
      onClose();
    } catch (err: any) {
      const code = err.code || '';
      setAuthError(translateFirebaseError(code));
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
        <h2>{isSignUp ? 'Registration' : 'Log in'}</h2>
        <p className={styles.subtitle}>
          {isSignUp 
            ? 'Thank you for your interest in our platform! Please fill in your details to register.'
            : 'Welcome back! Please enter your credentials to log in.'}
        </p>

        {authError && <p className={styles.error} style={{ color: 'red', fontSize: '14px', marginBottom: '12px' }}>{authError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {isSignUp && (
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                autoComplete="name"
                {...register('name')}
                placeholder="Full Name"
                className={styles.input}
              />
              {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name.message as string}</span>}
            </div>
          )}

          <div className={styles.field}>
            <label>Email Address</label>
            <input
              type="email"
              autoComplete="email"
              {...register('email')}
              placeholder="name@example.com"
              className={styles.input}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message as string}</span>}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              {...register('password')}
              placeholder="••••••••"
              className={styles.input}
            />
            {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message as string}</span>}
          </div>

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log in')}
          </button>
        </form>

        <div className={styles.toggle}>
          <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
          <button onClick={() => { setIsSignUp(!isSignUp); reset(); setAuthError(''); }}>
            {isSignUp ? 'Log in' : 'Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};
