import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { TeachersPage } from './pages/TeachersPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Footer } from './components/Footer';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
