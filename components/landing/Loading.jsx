'use client';

import React from 'react';

const LoadingScreen = () => (
  <div style={styles.loadingContainer}>
    <img
      src="/assets/Landing/LoadingEclipse.svg"
      alt="Loading..."
      style={styles.spinner}
    />
  </div>
);

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0c0d10',
  },
  spinner: {
    width: '100px',
    height: '100px',
  },
};

export default LoadingScreen;