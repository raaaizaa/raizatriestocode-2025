import React from 'react';

import styles from './LoadingSpotifyCard.module.css';

export default function LoadingSpotifyCard() {
  return (
    <div className={styles.spotifyCardContainer}>
      <div className={styles.artworkPlaceholder} />
      <div className={styles.spotifyTextContainer}>
        <p className={styles.spotifyTitle}>Loading title...</p>
        <p className={styles.spotifyArtist}>Loading Artist...</p>
      </div>
    </div>
  );
}
