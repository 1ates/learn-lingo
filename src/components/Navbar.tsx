import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { user, signOut, setTheme } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeSubMenuOpen, setIsThemeSubMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsThemeSubMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';

  const themes = [
    { id: 'yellow', name: 'Yellow', color: '#F4C550' },
    { id: 'green', name: 'Green', color: '#9FBAAE' },
    { id: 'blue', name: 'Blue', color: '#9FB7CE' },
    { id: 'salmon', name: 'Salmon', color: '#E0A39A' },
    { id: 'peach', name: 'Peach', color: '#F0AA8D' },
  ];

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsDropdownOpen(false);
    setIsThemeSubMenuOpen(false);
  };

  return (
    <>
      <nav style={{ width: '100%', background: '#ffffff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }}>
              <circle cx="16" cy="16" r="16" fill="#E30A17"/>
              <path d="M13 22C16.866 22 20 18.866 20 15C20 11.134 16.866 8 13 8C9.13401 8 6 11.134 6 15C6 18.866 9.13401 22 13 22Z" fill="white"/>
              <path d="M14.5 19.5C16.9853 19.5 19 17.4853 19 15C19 12.5147 16.9853 10.5 14.5 10.5C12.0147 10.5 10 12.5147 10 15C10 17.4853 12.0147 19.5 14.5 19.5Z" fill="#E30A17"/>
              <path d="M21.5 15L19 16.2L19.7 13.5L17.5 11.8H20.3L21.5 9.2L22.7 11.8H25.5L23.3 13.5L24 16.2L21.5 15Z" fill="white"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '20px', color: '#121417', letterSpacing: '-0.2px' }}>LearnLingo</span>
          </Link>

          <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link to="/" style={{ textDecoration: 'none', color: '#121417', fontWeight: 500, fontSize: '16px' }}>Home</Link></li>
            <li><Link to="/teachers" style={{ textDecoration: 'none', color: '#121417', fontWeight: 500, fontSize: '16px' }}>Teachers</Link></li>
            {user && <li><Link to="/favorites" style={{ textDecoration: 'none', color: '#121417', fontWeight: 500, fontSize: '16px' }}>Favorites</Link></li>}
          </ul>

          <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#121417',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F4C550', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#121417', fontWeight: 700 }}>
                    {userName[0].toUpperCase()}
                  </span>
                  <span>{userName}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '14px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      width: '220px',
                      zIndex: 100,
                      padding: '8px 0',
                    }}
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '13px', color: '#8A8A89', wordBreak: 'break-all' }}>
                      {user.email}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setIsThemeSubMenuOpen(!isThemeSubMenuOpen)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '15px',
                          color: '#121417',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: 500,
                        }}
                      >
                        <span>🎨 Theme</span>
                        <span>›</span>
                      </button>

                      {isThemeSubMenuOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-100%',
                            top: 0,
                            background: '#ffffff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '14px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            width: '200px',
                            padding: '8px 0',
                            zIndex: 110,
                          }}
                        >
                          {themes.map(t => (
                            <button
                              key={t.id}
                              onClick={() => handleThemeSelect(t.id)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 16px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                color: '#121417',
                                fontWeight: 500,
                              }}
                            >
                              <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: t.color, display: 'inline-block' }}></span>
                              <span>{t.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        signOut && signOut();
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: '#e53935',
                        borderTop: '1px solid #f0f0f0',
                        fontWeight: 500,
                      }}
                    >
                      🚪 Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setAuthMode('login'); setIsModalOpen(true); }}
                  style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 600, color: '#121417', cursor: 'pointer', padding: '8px 16px' }}
                >
                  Log in
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setIsModalOpen(true); }}
                  style={{ background: '#121417', border: 'none', fontSize: '16px', fontWeight: 600, color: '#ffffff', cursor: 'pointer', padding: '12px 24px', borderRadius: '12px' }}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIsSignUp={authMode === 'register'} />
    </>
  );
};
