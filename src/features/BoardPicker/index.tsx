import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import { TBoard } from '@/entities';

import { AddBoardButton } from '../AddBoardButton';
import { BoardPickerItem } from '../BoardPickerItem';
import { SortableItem } from '../SortableItem';

import { useBoardPicker } from './hooks';
import { BoardPickerWrapper } from './styled';

interface IBoardPicker {
  boards: TBoard[];
  setBoards: Dispatch<SetStateAction<TBoard[]>>;
  addNewBoard: () => void;
  activeBoardId: string;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
}

export const BoardPicker = ({
  boards,
  setBoards,
  addNewBoard,
  activeBoardId,
  setActiveBoardId,
}: IBoardPicker) => {
  const {
    boardPickerRef,

    handleBoardClick,

    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useBoardPicker({
    boards,
    setBoards,
    activeBoardId,
    setActiveBoardId,
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

        <AddBoardButton onClick={addNewBoard} />
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
