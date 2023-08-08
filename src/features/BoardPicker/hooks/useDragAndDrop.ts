import { Dispatch, SetStateAction, useState } from 'react';

import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { TBoard } from '@/entities';

const activationConstraint = {
  delay: 100,
  tolerance: 5,
};

interface IUseDragAndDrop {
  boards: TBoard[];
  setBoards: Dispatch<SetStateAction<TBoard[]>>;
}

export const useDragAndDrop = ({ boards, setBoards }: IUseDragAndDrop) => {
  const [activeDraggingBoardId, setActiveDraggingBoardId] =
    useState<UniqueIdentifier | null>(null);

  const activeDraggingBoard = boards.find(
    (board) => board.id === activeDraggingBoardId
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint }),
    useSensor(TouchSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!active) {
      return;
    }

    setActiveDraggingBoardId(active.id);
  };

  const getIndexById = (id: UniqueIdentifier) => {
    const boardById = boards.find((board) => board.id === id);

    return boardById ? boards.indexOf(boardById) : -1;
  };

  const handleDragEnd = ({ over }: DragEndEvent) => {
    if (over) {
      const overIndex = getIndexById(over.id);

      const activeIndex = activeDraggingBoardId
        ? getIndexById(activeDraggingBoardId)
        : -1;

      if (activeIndex !== overIndex) {
        setBoards((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  const handleDragCancel = () => setActiveDraggingBoardId(null);

  return {
    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
