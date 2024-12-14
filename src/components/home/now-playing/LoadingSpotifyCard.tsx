import React from 'react';

import styles from './LoadingSpotifyCard.module.css';

export default function LoadingSpotifyCard() {
  return (
    <div className={styles.spotifyCardContainer}>
      <div className={`${styles.artworkPlaceholder} ${styles.skeleton}`} />
      <div className={styles.spotifyTextContainer}>
        <div className={`${styles.spotifyTitle} ${styles.skeleton}`} />
        <div className={`${styles.spotifyArtist} ${styles.skeleton}`} />
      </div>
    </div>
  );
}
