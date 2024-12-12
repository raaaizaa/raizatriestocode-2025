import React, { useEffect, useState } from 'react';
import getNowPlaying from '../../../services/getNowPlaying';
import { TrackProps } from '../../../types/track';

import styles from './NowPlaying.module.css';

export default function NowPlaying() {
  const [nowPlayingData, setNowPlayingData] = useState<TrackProps | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlaying();
        setNowPlayingData(data);
      } catch (error) {
        console.error('Error fetching now playing data:', error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  const spotifyCard = ({
    trackUrl,
    albumImage,
    trackName,
    artistName,
  }: TrackProps) => (
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

  if (!nowPlayingData) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>Loading...</p>
      </div>
    );
  }

  const { trackName, artistName, playedAt } = nowPlayingData;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{playedAt ? 'Last played' : 'Now playing'}</p>
      {spotifyCard(nowPlayingData)}
    </div>
  );
}
