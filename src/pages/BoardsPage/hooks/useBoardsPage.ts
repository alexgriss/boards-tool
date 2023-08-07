import { useEffect, useState } from 'react';

import { UniqueIdentifier } from '@dnd-kit/core';

import { TBoard, TBoardGroups, TBoardItem } from '@/entities';
import { generateMocks } from '@/shared';

import { useAddNewBoard } from './useAddNewBoard';
import { generateSentence } from '@/shared/utils';

const boardsMock = generateMocks(
  {
    title: 'New Board',
  } as TBoard,
  5
);

const boardsItemsMock: TBoardGroups = {
  A: generateMocks(
    {
      title: generateSentence(),
    } as TBoardItem,
    4
  ),
  B: generateMocks(
    {
      title: generateSentence(),
    } as TBoardItem,
    3
  ),
  C: generateMocks(
    {
      title: generateSentence(),
    } as TBoardItem,
    5
  ),
};

export const useBoardsPage = () => {
  const [boards, setBoards] = useState(boardsMock);

  const [activeBoardId, setActiveBoardId] = useState(boards[0].id);

  const [boardItems, setBoardItems] = useState(boardsItemsMock);

  const { addNewBoard } = useAddNewBoard({
    setBoards,
    setActiveBoardId,
  });

  const [boardGroups, setBoardGroups] = useState(
    Object.keys(boardItems) as UniqueIdentifier[]
  );

  useEffect(() => {
    if (activeBoardId) {
      setBoardItems(boardsItemsMock);
      setBoardGroups(Object.keys(boardsItemsMock) as UniqueIdentifier[]);
    }
  }, [activeBoardId]);

  return {
    boards,
    setBoards,
    addNewBoard,
    activeBoardId,
    setActiveBoardId,

    boardItems,
    setBoardItems,
    boardGroups,
    setBoardGroups,
  };
};
