import type { ReactNode } from 'react';

import styles from './CardGrid.module.css';

interface CardGridProps {
  readonly children: ReactNode;
  readonly className?: string;
}

function CardGrid({ children, className }: CardGridProps) {
  return (
    <div className={className}>
      <div className={styles['grid-container']}>{children}</div>
    </div>
  );
}

export default CardGrid;
