import React, { useEffect, useRef, useState } from 'react';
import { TBoard } from '../../../types';
import { useBoardSwitcher } from './useBoardSwitcher';

const boards: Array<TBoard> = [
  {
    id: 0,
    title: 'New Board',
  },
  {
    id: 1,
    title: 'New Board',
  },
  {
    id: 2,
    title: 'New Board',
  },
  {
    id: 3,
    title: 'New Board',
  },
  {
    id: 4,
    title: 'New Board',
  },
];

const scrollIntoView = (
  ref: React.RefObject<HTMLDivElement>,
  index: number
) => {
  if (ref.current) {
    const element = ref.current.children[index];

    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

export const useGetBoards = () => {
  const [boardsState, setBoardsState] = useState(boards);

  const { activeBoard, setActiveBoard } = useBoardSwitcher({
    boardId: boardsState[0].id,
  });

  const RSBoardSwitcher = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollIntoView(RSBoardSwitcher, activeBoard);
  }, [activeBoard]);

  const addNewBoard = () => {
    setBoardsState((prevState: Array<TBoard>) => [
      ...prevState,
      { id: prevState.length, title: 'New Board' },
    ]);

    setActiveBoard(boardsState.length);
  };

  return {
    activeBoard,
    setActiveBoard,
    boards: boardsState,
    addNewBoard,
    RSBoardSwitcher,
  };
};
