import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import { TBoardItem } from '@/entities';

import { BoardItemWrapper } from './styled';

interface IBoardItemView {
  boardItem?: TBoardItem;
  isDragging: boolean;
  isDragOverlay?: boolean;
  style?: CSSProperties;
}

const BoardItemView = (
  { boardItem, isDragging, isDragOverlay, ...props }: IBoardItemView,
  ref: ForwardedRef<HTMLDivElement>
) => {
  if (!boardItem) return null;

  return (
    <BoardItemWrapper
      {...props}
      ref={ref}
      $isDragging={isDragging}
      $isDragOverlay={isDragOverlay}
      id={boardItem.id}
    >
      {boardItem.title}
    </BoardItemWrapper>
  );
};

export const BoardItem = forwardRef(BoardItemView);
