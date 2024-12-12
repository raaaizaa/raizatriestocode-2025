import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>About</p>
      <img
        src="portrait.jpg"
        width={300}
        height={300}
        alt="raiza-tapi-bentuknya-gambar"
      />
      <p className={styles.subtitle}>
        Tempat seorang cowok kelahiran 2003 menuangkan pikirannya dalam bentuk
        website. Orangnya mungkin dari luar keliatannya sunyi, tapi otaknya
        berisik terus. Hobinya biasanya cuma muter di musik, video game, dan
        sedikit wibu (biasanya gua sebut dengan part-time weeaboo). Seringkali
        punya banyak ide tentang banyak hal tapi males eksekusi atau eksekusinya
        gak sesuai ekspektasi. Salah satunya website ini yang udah ada di dalem
        pikiran dari taun 2023 tapi baru direalisasikan akhir-akhir ini. Suka minum
        susu tiga kali sehari.
      </p>
    </div>
  );
}
