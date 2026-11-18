# LearnLingo 🌍💬

LearnLingo is a modern, responsive web application designed to connect language learners with professional teachers. Built with React, TypeScript, Vite, and Firebase Realtime Database, LearnLingo offers a seamless interactive experience featuring teacher filtering, trial bookings, favorites management, and instant theme customization.

---

## 🚀 Features

- **Teacher Discovery & Filtering:** Filter expert language teachers by language, level, price, and rating.
- **Trial Lesson Booking:** Interactive modal to book trial lessons with teachers, validated via React Hook Form and Yup.
- **Favorites Management:** Save favorite teachers to your personal favorites list, synchronized in real-time with Firebase.
- **Theme Customization:** Instantly switch between 5 gorgeous color themes (Yellow, Green, Blue, Salmon, Peach), persisted in `localStorage` and Firebase RTDB.
- **Secure Authentication:** User registration and login powered by Firebase Authentication.
- **Centralized SVG Sprites:** High-performance vector icons rendered cleanly via a centralized sprite (`public/icons.svg`) and custom `<Icon />` wrapper.
- **Strict CSS Modules:** Zero inline styles policy; all component styles encapsulated in dedicated CSS modules.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, React Router DOM
- **State Management & Context:** React Context API (`AuthContext`)
- **Backend & Database:** Firebase Authentication & Realtime Database (RTDB)
- **Forms & Validation:** React Hook Form, Yup, `@hookform/resolvers`
- **Styling:** CSS Modules, Custom CSS Variables

---

## 📂 Project Architecture

```text
learn-lingo/
├── public/
│   ├── icons.svg          # Centralized SVG icon sprite
│   └── images/            # Hero and illustration assets
├── src/
│   ├── components/        # Reusable UI components (Navbar, TeacherCard, Modals, etc.)
│   ├── context/           # React Context (AuthContext)
│   ├── data/              # Static dataset fallbacks
│   ├── pages/             # Route pages (HomePage, TeachersPage, FavoritesPage)
│   ├── services/          # Firebase configuration and API services
│   ├── App.tsx            # Main application router and root layout
│   └── main.tsx           # Application entry point
├── database.rules.json    # Firebase Realtime Database security rules
├── firebase.json          # Firebase hosting/database configuration
└── package.json           # Dependencies and scripts
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/1ates/learn-lingo.git
   cd learn-lingo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

5. Build for Production:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is licensed under the MIT License.
