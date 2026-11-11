import React from 'react';
import styles from './HowItWorks.module.css';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Choose Your Language',
      description: 'Browse through hundreds of certified native tutors specializing in the language you want to master.',
      icon: '🌍',
    },
    {
      title: 'Pick a Schedule',
      description: 'Flexible booking system allows you to choose slots that fit perfectly into your daily routine.',
      icon: '📅',
    },
    {
      title: 'Start Learning',
      description: 'Engage in immersive 1-on-1 conversations and accelerate your fluency with personalized feedback.',
      icon: '🚀',
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>How LearnLingo Works</h1>
        <p>Three simple steps to start speaking a new language fluently.</p>
      </section>

      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <div className={styles.icon}>{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <div className={styles.stepNumber}>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
