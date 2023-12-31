import React, { ReactElement } from 'react';
// import clsx from 'clsx';
import Masonry from 'react-masonry-css';

import styles from './CardGrid.module.css';

function CardGrid(props: {
  children: React.ReactNode;
  className?: string;
}): ReactElement {
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    768: 2,
    576: 1,
  };

  return (
    <div className={props.className}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['grid-container']}
        columnClassName={styles['grid-column']}
      >
        {props.children}
      </Masonry>
    </div>
  );
}

export default CardGrid;
