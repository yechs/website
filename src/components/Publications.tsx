import type { ReactNode } from 'react';

import styles from '../pages/index.module.css';

export interface PublicationItem {
  readonly content: ReactNode;
}

export default function Publications({
  publications,
}: {
  publications: readonly PublicationItem[];
}) {
  return (
    <ul className={styles.paperListing}>
      {publications.map((publication, index) => (
        <li key={index}>{publication.content}</li>
      ))}
    </ul>
  );
}
