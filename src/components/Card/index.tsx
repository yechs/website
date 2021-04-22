import React, { ReactElement } from 'react';
import styles from './Card.module.css';

interface CardProps {
  img?: string;
  imgAlt?: string;
  title: string;
  caption?: string;
  children?: React.ReactNode;
}

function Card(props: CardProps): ReactElement {
  return (
    <div className={styles.card}>
      {props.img && <img src={props.img} alt={props.imgAlt} />}
      <div className={styles['card-body']}>
        <h2 className={styles['card-title']}>{props.title}</h2>
        {props.children}
        {props.caption && (
          <h5 className={styles['card-caption']}>{props.caption}</h5>
        )}
      </div>
    </div>
  );
}

export default Card;
export type { CardProps };
