import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import { UseMutationResult } from '@tanstack/react-query';

import { SortableItem } from '@/widgets';

import { TUser } from '@/entities';

import { BoardPickerItem } from '../BoardPickerItem';

import { useBoardPicker } from './hooks';
import { BoardPickerWrapper } from './styled';
// import { AddBoardButton } from './ui';

interface IBoardPicker {
  updateUserMutation: UseMutationResult<TUser, unknown, TUser, unknown>;
  activeBoardId: string;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
}

export const BoardPicker = ({
  updateUserMutation,
  activeBoardId,
  setActiveBoardId,
}: IBoardPicker) => {
  const {
    boardPickerRef,

    boards,
    // isLoading,
    // isError,

    // createBoardMutation,
    // updateBoardMutation,
    // removeBoardMutation,
    // removeBoardsMutation,

    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,

    handleBoardClick,
  } = useBoardPicker({
    activeBoardId,
    setActiveBoardId,
    updateUserMutation,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToHorizontalAxis]}
    >
      <BoardPickerWrapper ref={boardPickerRef}>
        <SortableContext
          items={boards.map((board) => board.id)}
          strategy={horizontalListSortingStrategy}
        >
          {boards.map((board) => (
            <SortableItem key={board.id} sortableItemId={board.id}>
              {({ setNodeRef, style, attributes, listeners, isDragging }) => (
                <BoardPickerItem
                  {...attributes}
                  {...listeners}
                  ref={setNodeRef}
                  style={style}
                  board={board}
                  isDragging={isDragging}
                  isActive={activeBoardId === board.id}
                  handleBoardClick={handleBoardClick}
                />
              )}
            </SortableItem>
          ))}
        </SortableContext>

        {/* <AddBoardButton onClick={addNewBoard} /> */}
      </BoardPickerWrapper>

      {createPortal(
        <DragOverlay>
          {activeDraggingBoard && (
            <BoardPickerItem
              isDragging
              isDragOverlay
              handleBoardClick={handleBoardClick}
              isActive={activeBoardId === activeDraggingBoard.id}
              board={activeDraggingBoard}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
