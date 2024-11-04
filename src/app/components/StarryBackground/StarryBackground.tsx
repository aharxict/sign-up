import React, { ReactNode } from 'react';
import { Star } from '../../types/starTypes';
import styles from './StarryBackground.module.css';

interface StarryBackgroundProps {
  children: ReactNode;
}

const starConfig: Star[] = [
  { id: 1, x: 20.27, y: 19.95, width: 21, height: 21 },
  { id: 2, x: 74.67, y: 33.0, width: 27, height: 27 },
  { id: 3, x: 30.67, y: 16.87, width: 15, height: 15 },
  { id: 4, x: 69.33, y: 70.94, width: 21, height: 21 },
  { id: 5, x: 24.0, y: 67.61, width: 27, height: 27 },
  { id: 6, x: 81.33, y: 7.02, width: 15, height: 15 },
  { id: 7, x: 18.67, y: 93.72, width: 15, height: 15 },
];

const StarryBackground: React.FC<StarryBackgroundProps> = ({ children }) => {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.starsWrapper}>
        {starConfig.map((star) => (
          <svg
            key={star.id}
            className={styles.starElement}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.width}px`,
              height: `${star.height}px`,
            }}
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M13.532 0L17.1868 9.87711L27.0639 13.532L17.1868 17.1868L13.532 27.0639L9.87711 17.1868L0 13.532L9.87711 9.87711L13.532 0Z'
              fill='#CFE1F4'
            />
          </svg>
        ))}
      </div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default StarryBackground;
