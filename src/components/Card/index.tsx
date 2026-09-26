import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './Card.module.css';

interface CardProps {
  readonly id: string;
  readonly img?: string;
  readonly imgAlt?: string;
  readonly title: string;
  readonly caption?: string;
  readonly children?: ReactNode;
}

function Card({ id, img, imgAlt, title, caption, children }: CardProps) {
  const titleId = `card-${id}-title`;
  const imageUrl = useBaseUrl(img);

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      {imageUrl && <img src={imageUrl} alt={imgAlt ?? ''} loading="lazy" />}
      <div className={styles['card-body']}>
        <h3 id={titleId} className={styles['card-title']}>
          {title}
        </h3>
        {children}
        {caption && <p className={styles['card-caption']}>{caption}</p>}
      </div>
    </article>
  );
}

export default Card;
export type { CardProps };
