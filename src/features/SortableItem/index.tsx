import { CSSProperties, ReactNode } from 'react';

import { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ISortableItemChildrenProps {
  setNodeRef: (node: HTMLElement | null) => void;
  style: CSSProperties;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  isDragging: boolean;
}

interface ISortableItem {
  sortableItemId: UniqueIdentifier;
  children: (props: ISortableItemChildrenProps) => ReactNode;
}

export const SortableItem = ({ sortableItemId, children }: ISortableItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableItemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return children({ setNodeRef, style, attributes, listeners, isDragging });
};
