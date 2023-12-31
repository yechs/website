import React, { ReactElement } from 'react';

export interface NewsItem {
  date?: string;
  content: React.ReactNode;
}

export default function News(props: { news: NewsItem[] }): ReactElement {
  return (
    <ul>
      {props.news.map((item: NewsItem, idx) => (
        <li key={idx}>
          {item.date ? (
            <>
              [<strong>{item.date}</strong>]{' '}
            </>
          ) : null}
          {item.content}
        </li>
      ))}
    </ul>
  );
}
