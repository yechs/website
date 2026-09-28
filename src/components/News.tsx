import type { ReactNode } from 'react';

export interface NewsItem {
  readonly id: string;
  readonly date?: string;
  readonly content: ReactNode;
}

export default function News({
  news,
  visibleCount = 5,
}: {
  news: readonly NewsItem[];
  visibleCount?: number;
}) {
  const visibleNews = news.slice(0, visibleCount);
  const olderNews = news.slice(visibleCount);

  const renderNewsItem = (item: NewsItem) => (
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
  );

  return (
    <>
      <ul>{visibleNews.map(renderNewsItem)}</ul>
      {olderNews.length > 0 ? (
        <details>
          <summary>Show older news</summary>
          <ul>{olderNews.map(renderNewsItem)}</ul>
        </details>
      ) : null}
    </>
  );
}
