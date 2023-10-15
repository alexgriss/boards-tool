import { Dispatch, SetStateAction, useRef } from 'react';

import { UseMutationResult } from '@tanstack/react-query';

import { TBoard, TUser } from '@/entities';

import { useBoardsData } from './useBoardsData';
import { useClickBoardItem } from './useClickBoardItem';
import { useDragAndDrop } from './useDragAndDrop';

interface IUseBoardPicker {
  activeBoardId: string;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
  updateUserMutation: UseMutationResult<TUser, unknown, TUser, unknown>;
}

export const useBoardPicker = ({
  activeBoardId,
  setActiveBoardId,
  updateUserMutation,
}: IUseBoardPicker) => {
  const boardPickerRef = useRef<HTMLDivElement>(null);

  const {
    boards,
    isLoading,
    isError,

    createBoardMutation,
    updateBoardMutation,
    removeBoardMutation,
    removeBoardsMutation,
  } = useBoardsData({ setActiveBoardId });

  const {
    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop({
    boards,
    updateBoards: (boards: TBoard[]) =>
      updateUserMutation.mutate({
        username: 'alexgriss',
        items: boards,
      }),
  });

  const { handleBoardClick } = useClickBoardItem({
    boardPickerRef,
    setActiveBoardId,
    activeBoardId,
  });

  return {
    boardPickerRef,

    boards,
    isLoading,
    isError,

    createBoardMutation,
    updateBoardMutation,
    removeBoardMutation,
    removeBoardsMutation,

    activeDraggingBoard,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,

    handleBoardClick,
  };
};
