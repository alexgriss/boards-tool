import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import { TCard } from '@/entities';

import { CardWrapper } from './styled';

interface ICardView {
  card?: TCard;
  isDragging: boolean;
  isDragOverlay?: boolean;
  style?: CSSProperties;
}

const CardView = (
  { card, isDragging, isDragOverlay, ...props }: ICardView,
  ref: ForwardedRef<HTMLDivElement>
) => {
  if (!card) return null;

  return (
    <CardWrapper
      {...props}
      ref={ref}
      $isDragging={isDragging}
      $isDragOverlay={isDragOverlay}
      id={card.id}
    >
      {card.title}
    </CardWrapper>
  );
};

export const Card = forwardRef(CardView);
