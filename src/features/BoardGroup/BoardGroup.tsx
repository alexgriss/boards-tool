import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from '@/widgets';
import { TBoardItem } from '@/entities';

import { BoardItem } from '../BoardItem';

import { BoardGroupHeader, BoardGroupWrapper } from './styled';

interface IBoardGroupView {
  groupId: string;
  boardGroup: TBoardItem[];
  isDragging: boolean;
  isDragOverlay?: boolean;
  style?: CSSProperties;
}

const BoardGroupView = (
  { groupId, boardGroup, isDragging, isDragOverlay, ...props }: IBoardGroupView,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <BoardGroupWrapper
      {...props}
      ref={ref}
      $isDragging={isDragging}
      $isDragOverlay={isDragOverlay}
      id={groupId}
    >
      <BoardGroupHeader>{groupId}</BoardGroupHeader>

      <SortableContext
        items={boardGroup}
        strategy={verticalListSortingStrategy}
      >
        {boardGroup.map((boardItem) => (
          <SortableItem key={boardItem.id} sortableItemId={boardItem.id}>
            {({ setNodeRef, style, attributes, listeners, isDragging }) => (
              <BoardItem
                {...attributes}
                {...listeners}
                ref={setNodeRef}
                style={style}
                boardItem={boardItem}
                isDragging={isDragging}
              />
            )}
          </SortableItem>
        ))}
      </SortableContext>
    </BoardGroupWrapper>
  );
};

export const BoardGroup = forwardRef(BoardGroupView);
