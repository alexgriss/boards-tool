import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { TCard } from '@/entities';

import { AddCardButton } from '../add-card-button';
import { Card } from '../card';
import { SortableItem } from '../sortable-item';

import { CardGroupHeader, CardGroupWrapper } from './styled';

interface ICardGroupView {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  groupId: string;
  cardGroup: TCard[];
  isDragging: boolean;
  isDragOverlay?: boolean;
  style?: CSSProperties;
  addNewCard?: (cardGroupId: string) => void;
}

const CardGroupView = (
  {
    attributes,
    listeners,
    groupId,
    cardGroup,
    isDragging,
    isDragOverlay,
    addNewCard,
    ...props
  }: ICardGroupView,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <CardGroupWrapper
      {...props}
      ref={ref}
      $isDragOverlay={isDragOverlay}
      id={groupId}
    >
      <CardGroupHeader $isDragging={isDragging} {...attributes} {...listeners}>
        {groupId}
      </CardGroupHeader>

      <SortableContext items={cardGroup} strategy={verticalListSortingStrategy}>
        {cardGroup.map((card) => (
          <SortableItem key={card.id} sortableItemId={card.id}>
            {({ setNodeRef, style, attributes, listeners, isDragging }) => (
              <Card
                {...attributes}
                {...listeners}
                ref={setNodeRef}
                style={style}
                card={card}
                isDragging={isDragging}
              />
            )}
          </SortableItem>
        ))}
      </SortableContext>

      <AddCardButton onClick={() => addNewCard && addNewCard(groupId)} />
    </CardGroupWrapper>
  );
};

export const CardGroup = forwardRef(CardGroupView);
