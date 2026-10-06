import { visit } from 'unist-util-visit';

const labels = {
  caution: 'Caution',
  danger: 'Danger',
  info: 'Info',
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
};

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      const kind = node.name in labels ? node.name : 'note';
      const data = node.data || (node.data = {});

      data.hName = 'aside';
      data.hProperties = {
        className: ['admonition', `admonition--${kind}`],
        'aria-label': labels[kind],
      };

      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['admonition__title'] } },
        children: [
          {
            type: 'strong',
            children: [{ type: 'text', value: labels[kind] }],
          },
        ],
      });
    });
  };
}

export function remarkExplicitHeadingIds() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const lastChild = node.children.at(-1);
      if (!lastChild || lastChild.type !== 'text') return;

      const match = lastChild.value.match(/^(.*?)\s*\{#([^}]+)\}$/);
      if (!match) return;

      lastChild.value = match[1];
      const data = node.data || (node.data = {});
      data.hProperties = { ...(data.hProperties || {}), id: match[2] };
    });
  };
}
