import { TBoard } from '@/types';
import { generateMocks } from '@/utils';
import { useRef, useState } from 'react';
import { useAddNewBoard } from './useAddNewBoard';
import { useClickOnBoardItem } from './useClickOnBoardItem';
import { useSetActiveBoardId } from './useSetActiveBoardId';

const boardsMock = generateMocks(
  {
    title: 'New Board',
  } as TBoard,
  5
);

export const useBoardsSwitcher = () => {
  const RSBoardSwitcher = useRef<HTMLDivElement>(null);

  const [boardsState, setBoardsState] = useState(boardsMock);

  const { activeBoardId, setActiveBoardId } = useSetActiveBoardId({
    boardId: boardsState[0].id,
  });

  const { addNewBoard } = useAddNewBoard({ setBoardsState, setActiveBoardId });

  const { onBoardItemClick } = useClickOnBoardItem({
    RSBoardSwitcher,
    setActiveBoardId,
    activeBoardId,
  });

  return {
    activeBoardId,
    boards: boardsState,
    addNewBoard,
    RSBoardSwitcher,
    onBoardItemClick,
  };
};
