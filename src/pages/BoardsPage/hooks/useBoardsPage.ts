import { useEffect, useState } from 'react';

import { UniqueIdentifier } from '@dnd-kit/core';

import { TBoard, TCardGroups, TCard } from '@/entities';
import { generateMocks } from '@/shared';

import { useAddNewBoard } from './useAddNewBoard';

const boardsMock = generateMocks(
  {
    title: 'Board',
  } as TBoard,
  2
);

const cardsMock: TCardGroups = {
  New: generateMocks(
    {
      title: 'Card',
    } as TCard,
    4
  ),
  'In progress': generateMocks(
    {
      title: 'Card',
    } as TCard,
    3
  ),
  Finished: generateMocks(
    {
      title: 'Card',
    } as TCard,
    5
  ),
};

export const useBoardsPage = () => {
  const [boards, setBoards] = useState(boardsMock);

  const [activeBoardId, setActiveBoardId] = useState(boards[0].id);

  const [cards, setCards] = useState(cardsMock);

  const [cardGroups, setCardGroups] = useState(
    Object.keys(cards) as UniqueIdentifier[]
  );

  const { addNewBoard } = useAddNewBoard({
    setBoards,
    setActiveBoardId,
  });

  useEffect(() => {
    if (activeBoardId) {
      setCards(cardsMock);

      setCardGroups(Object.keys(cardsMock) as UniqueIdentifier[]);
    }
  }, [activeBoardId]);

  return {
    boards,
    setBoards,
    addNewBoard,
    activeBoardId,
    setActiveBoardId,

    cards,
    setCards,
    cardGroups,
    setCardGroups,
  };
};
