import React, { useEffect, useState } from 'react';
import getNowPlaying from '../../../services/getNowPlaying';
import styles from './NowPlaying.module.css';

export default function NowPlaying() {
  const [nowPlayingData, setNowPlayingData] = useState<any | null>(null);

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

    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const spotifyCard = () => (
    <div className={styles.spotifyCardContainer}>
      <a href={nowPlayingData?.trackUrl} target="_blank" className={styles.albumAnchor}>
        <img
          alt="album-cover"
          src={nowPlayingData?.albumImage}
          width={200}
          height={200}
        />
      </a>
      <div className={styles.spotifyTextContainer}>
        <p className={styles.spotifyTitle}>
          {nowPlayingData?.trackName.length > 25
            ? `${nowPlayingData?.trackName.substring(0, 25)}...`
            : nowPlayingData?.trackName}
        </p>
        <p className={styles.spotifyArtist}>
          {nowPlayingData?.artistName > 25
            ? `${nowPlayingData?.artistName.substring(0, 25)}...`
            : nowPlayingData?.artistName}
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <p className={styles.title}>{nowPlayingData?.playedAt ? 'LAST PLAYED' : 'NOW PLAYING'}</p>
      {nowPlayingData ? spotifyCard() : <p>Loading</p>}
    </div>
  );
}
