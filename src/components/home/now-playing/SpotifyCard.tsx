import React from 'react';
import { TrackProps } from '../../../types/track';

import styles from './SpotifyCard.module.css';

export default function SpotifyCard({
  trackUrl,
  albumImage,
  trackName,
  artistName,
}: TrackProps) {
  return (
    <div className={styles.spotifyCardContainer}>
      <a
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.albumAnchor}>
        <img alt="album cover" src={albumImage} width={300} height={300} />
      </a>
      <div className={styles.spotifyTextContainer}>
        <p className={styles.spotifyTitle}>
          {trackName.length > 25
            ? `${trackName.substring(0, 25)}...`
            : trackName}
        </p>
        <p className={styles.spotifyArtist}>
          {artistName.length > 25
            ? `${artistName.substring(0, 25)}...`
            : artistName}
        </p>
      </div>
    </div>
  );
}
