import type { ReactNode } from 'react';

export interface NewsItem {
  readonly id: string;
  readonly date?: string;
  readonly content: ReactNode;
}

export default function News({ news }: { news: readonly NewsItem[] }) {
  return (
    <ul>
      {news.map((item) => (
        <li key={item.id}>
          {item.date ? (
            <>
              [
              <time dateTime={item.date.replaceAll('/', '-')}>
                <strong>{item.date}</strong>
              </time>
              ]{' '}
            </>
          ) : null}
          {item.content}
        </li>
      ))}
    </ul>
  );
}
