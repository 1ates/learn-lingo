import React from 'react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock handler for now, integrates with AuthContext signIn/signUp
    console.log(`${isSignUp ? 'Signing up' : 'Signing in'} with:`, { email, password });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p className={styles.subtitle}>
          {isSignUp ? 'Join our community of language learners.' : 'Sign in to manage your bookings.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className={styles.toggle}>
          <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
