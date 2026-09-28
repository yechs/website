import type { ReactNode } from 'react';

export interface ServiceItem {
  readonly content: ReactNode;
}

export default function Service({
  services,
}: {
  services: readonly ServiceItem[];
}) {
  return (
    <ul>
      {services.map((item, index) => (
        <li key={index}>{item.content}</li>
      ))}
    </ul>
  );
}
