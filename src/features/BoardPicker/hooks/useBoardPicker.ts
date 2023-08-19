import { Dispatch, SetStateAction, useRef } from 'react';

import { TBoard } from '@/entities';

import { useClickBoardItem } from './useClickBoardItem';
import { useDragAndDrop } from './useDragAndDrop';

interface IUseBoardPicker {
  boards: TBoard[];
  setBoards: Dispatch<SetStateAction<TBoard[]>>;
  activeBoardId: string;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
}

export const useBoardPicker = ({
  boards,
  setBoards,
  activeBoardId,
  setActiveBoardId,
}: IUseBoardPicker) => {
  const boardPickerRef = useRef<HTMLDivElement>(null);

  const {
    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop({ boards, setBoards });

  const { handleBoardClick } = useClickBoardItem({
    boardPickerRef,
    setActiveBoardId,
    activeBoardId,
  });

  return {
    boardPickerRef,

    handleBoardClick,

    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
