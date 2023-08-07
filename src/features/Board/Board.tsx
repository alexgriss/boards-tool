import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { TBoardGroups } from '@/entities';
import { SortableItem } from '@/widgets';

import { BoardGroup } from '../BoardGroup';
import { BoardItem } from '../BoardItem';

import { BoardWrapper } from './styled';
import { useBoard } from './hooks';

interface IBoard {
  boardItems: TBoardGroups;
  setBoardItems: Dispatch<SetStateAction<TBoardGroups>>;
  boardGroups: UniqueIdentifier[];
  setBoardGroups: Dispatch<SetStateAction<UniqueIdentifier[]>>;
}

export const Board = ({
  boardItems,
  setBoardItems,
  boardGroups,
  setBoardGroups,
}: IBoard) => {
  const {
    boardRef,

    sensors,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,

    activeId,
    activeBoardItem,
  } = useBoard({
    boardItems,
    setBoardItems,
    setBoardGroups,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <BoardWrapper ref={boardRef}>
        <SortableContext
          items={boardGroups}
          strategy={horizontalListSortingStrategy}
        >
          {boardGroups.map((groupId) => (
            <SortableItem key={groupId} sortableItemId={groupId}>
              {({ setNodeRef, style, attributes, listeners, isDragging }) => (
                <BoardGroup
                  {...attributes}
                  {...listeners}
                  ref={setNodeRef}
                  style={style}
                  groupId={String(groupId)}
                  boardGroup={boardItems[groupId]}
                  isDragging={isDragging}
                />
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </BoardWrapper>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            boardGroups.includes(activeId) ? (
              <BoardGroup
                isDragging
                isDragOverlay
                groupId={String(activeId)}
                boardGroup={boardItems[activeId]}
              />
            ) : (
              <BoardItem isDragging isDragOverlay boardItem={activeBoardItem} />
            )
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
