import type { ReactNode } from 'react';

export interface ServiceItem {
  readonly id: string;
  readonly content: ReactNode;
}

export default function Service({
  services,
}: {
  services: readonly ServiceItem[];
}) {
  return (
    <ul>
      {services.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
}
